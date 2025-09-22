// app/pages/memberships/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import AddMembershipModal from '../dashboard/modal/AddMembershipModal';
import EditMembershipModal from '../dashboard/modal/EditMembershipModal';
import DeleteMembershipModal from '../dashboard/modal/DeleteMembershipModal';
import { type } from 'os';

export default function Memberships() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<any>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);


      const [onlyMem, setOnlyMem] = useState([]);


  useEffect(() => {
    fetchMembersip();

  }, []);


 type Memberships = {
  id: number,
  name_membership: String,
  price_membership:number
  duration_membership: String
  offers_membership:string[];
  status_membership: boolean
 }




  const [member, setMember] = useState<Memberships[]>([])


  const fetchMembersip= async () => {
               const token = localStorage.getItem('access');


    try{
        fetch("http://127.0.0.1:8000/membership/",{

              method: "GET",
           headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }) // si hay token, se agrega
      }
      })
        .then(async (response) => {
          console.log("Response: ", response.status) 
          if(!response.ok){
              const text = await response.text()
              console.log("Contenido de error: ", text) 
              throw new Error(`Error al obtener los datos ${response.status}`)
          }
          return response.json()
          })
            .then((data) => {
              // console.log("Datos mostrados: ", data)
              setMember(data)
            })
          .catch((error) => console.log("Error: ", error)) 

    } catch (error){
      console.log("Error: ", error);
    }
  }

 
 const membership = member.map((m) => ({
    id: m.id,
    name: m.name_membership,  
    price: m.price_membership,
    duration:  m.duration_membership,
    status:m.status_membership,
    ofertas_membresia:m.offers_membership
  }));

    const filteredMemberships = membership.filter(memFilt =>
    memFilt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memFilt.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    memFilt.duration.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
  const productsPerPage = 5;

    const totalPages = Math.ceil(filteredMemberships.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredMemberships.slice(indexOfFirstProduct, indexOfLastProduct);

   const handleProductClickGet = (GetMem: any) => {
  setOnlyMem(GetMem)
    console.log(GetMem)
  return onlyMem
  };



const hasMemberships = currentProducts.length > 0;
console.log(hasMemberships)

  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Membresías</h1>
          <p className="text-gray-600">Administra las membresías disponibles</p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barra de búsqueda */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar membresía..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botón agregar membresía */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Membresía</span>
            </button>
          </div>
        </div>



        {/* Tabla de membresías */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {member.length===0? (
                <div className="text-center text-gray-500 py-12 text-lg">¡Sin Membresias!</div>
            ): (

          
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membresía
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ofertas
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProducts.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">{plan.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        plan.duration=="mensual"
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {plan.duration === 'Mensual' ? 'Mensual' : 'Anual'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <ul className="list-disc list-inside space-y-1">
                          {plan.ofertas_membresia.slice(0, 3).map((oferta, i) => ( 
                             <li key={i} className="text-gray-600">{oferta}</li> 
                           ))}
                           {plan.ofertas_membresia.length > 3 && (
                            <li className="text-blue-600">+{plan.ofertas_membresia.length - 3} más</li>
                          )}
                        </ul>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {plan.status ===false ? 'No activo':"Activo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() =>{ 
                            console.log("antes de mantar"+plan.ofertas_membresia)
                            console.log("antes de mantar"+typeof(plan.ofertas_membresia))
                            handleProductClickGet(plan)
                            setShowEditModal(true)
                            }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Edit className="h-4 w-4" />

                        </button>
                        <button 
                          onClick={(e) => {
                              handleProductClickGet(plan)
                             setShowDeleteModal(true)}}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
              )}
          </div>
        </div>

        {/* Modales */}
         <AddMembershipModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onMembership={fetchMembersip}
        />

        <EditMembershipModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onMembership={fetchMembersip}
          membership={onlyMem}
        />


        <DeleteMembershipModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={fetchMembersip}
          membership={onlyMem}
        />
      </div>
    </div>
  );
} 