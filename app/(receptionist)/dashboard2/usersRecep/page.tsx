'use client';

import { 
  Search, 
  User, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  Plus,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddUserModal from '@/app/(receptionist)/dashboard2/modal/userModal/AddUserModal';
// import EditUsertModal from '../modal/EditUserModal';
// import DeleteUserModal from '../modal/DeleteUserModal';

import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  user_id: number; // o "id", según cómo tu backend construya el token
  email: string;
  exp: number;
  iat: number;
}




// Tipos de datos
interface NewUser {
  name: string;
  email: string;
  membership: 'Premium' | 'Plus' | 'Básica';
  status: 'Activo' | 'Suspendido';
}

export default function UserManagement() {




const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

useEffect(() => {
  
  const token = localStorage.getItem("access");
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setLoggedInUserId(decoded.user_id);
    } catch (e) {
      console.error("Token inválido:", e);
    }
  }
}, []);


  // Estados principales
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [filterMembership, setFilterMembership] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddForm2, setShowAddForm2] = useState(false);
  const [removeUser, SetremoveUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    membership: 'Básica',
    status: 'Activo'
  });
  
  const [onlyUser, setOnlyUser] = useState([]);





  // Configuración de paginación
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

   

  type User = {
    id: number,
    email: string,
    name: string,
    membership: string| null,
    is_active: Boolean,
    date_pay: Date,
    date_expiration: Date,
  }
  
  const [user, setUser] = useState<User[]>([])

  // Se realiza la peticion al back
  const fetchUsers= async () => {
            const token = localStorage.getItem('access');

    try{
        fetch("http://127.0.0.1:8000/useraccount/",{
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
              console.log("Datos: ", data)
              setUser(data)
            })
          .catch((error) => console.log("Error: ", error)) 

    } catch (error){
      console.log("Error: ", error);
    }
  }


   const [Memberships, setMembership] = useState<
        {id:string; name_membership:string; duration_membership:string}[]
    >([]);


       useEffect(() => {
        fetch("http://localhost:8000/membership") // ajusta la URL según tu backend
            .then((res) => res.json())
            .then((data) => {console.log("data", data); setMembership(data)})
            .catch((err) => console.error("Error cargando categorías", err));
    }, []);






  // Se guardan los datos obtenidos de la base de datos
  const users = user.map((m) => ({
    id: m.id,
    email: m.email,
    name: m.name,
    membership: m.membership,
    is_active: m.is_active,
    date_pay: new Date(m.date_pay),
    date_expiration: new Date(m.date_expiration),
  }));

  // Formato de la fecha ej: 03/07/2025
  function formatDate(date: Date): string {
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }


  
  // Funciones utilitarias
  const getStatusColor = (status: string): string => {
    const colors = {
      'Activo': 'bg-green-100 text-green-800',
      'Suspendido': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getMembershipColor = (membership: string): string => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800',
      'Plus': 'bg-blue-100 text-blue-800',
      'Básica': 'bg-yellow-100 text-yellow-800'
    };
    return colors[membership as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Filtros y paginación
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = filterMembership === 'all' || user.membership === filterMembership;
    return matchesSearch && matchesMembership;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const selectedUserData = users.find(user => user.id === selectedUser);

  // Manejadores de eventos
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }
    toast.success('Usuario agregado exitosamente');
    setNewUser({
      name: '',
      email: '',
      membership: 'Básica',
      status: 'Activo'
    });
    setShowAddForm(false);
  };

  const handleInputChange = (field: keyof NewUser, value: string) => {
    setNewUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Resetear página cuando cambien los filtros
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterMembership(value);
    setCurrentPage(1);
  };


     const handleUserClickGet = (GetUser: any) => {
  setOnlyUser(GetUser)
    return onlyUser
  };

const getMembershipName = (id: string | null) => {
  if (!id) return "Sin membresía";

  const found = Memberships.find((m) => String(m.id) === String(id));
  return found ? found.name_membership : "No encontrada";
};


console.log(currentUsers.length)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios y sus membresías</p>
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
                placeholder="Buscar usuario por nombre o email..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Filtro por membresía */}  
            <div className="lg:w-48">
              <select
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={filterMembership}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">Todas las membresías</option>
                <option value="Premium">Premium</option>
                <option value="Plus">Plus</option>
                <option value="Básica">Básica</option>
              </select>
            </div>

            {/* Botón agregar usuario */}
            <button 
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Usuario</span>
            </button>
          </div>
        </div>

        {/* Contenedor principal con tabla y detalles */}
        <div className="flex gap-6">
          {/* Tabla de usuarios */}
          <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${selectedUser ? 'flex-1' : 'w-full'}`}>
            <div className="overflow-x-auto">
              {currentUsers.length <= 1? (
                <div className="text-center text-gray-500 py-12 text-lg">¡Sin Usuarios,  Solo estas tu!</div>
                
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Membresía
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.filter((u)=>u.id !==loggedInUserId).map((user) => (
                      <tr 
                        key={user.id}
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                          selectedUser === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        onClick={() => {setSelectedUser(user.id); handleUserClickGet(user)}}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-black-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(user?.membership || "Sin membresías")}`}>
                            {getMembershipName(user?.membership) || "Sin membresías"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.membership ? "Activo" : "Suspendido")}`}>
                            {user.membership ? "Activo" : "Suspendido"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Paginación - Siempre visible */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Mostrando {filteredUsers.length === 0 ? 0 : Math.min(indexOfFirstUser + 1, filteredUsers.length)} - {filteredUsers.length === 0 ? 0 : Math.min(indexOfLastUser, filteredUsers.length)} de {filteredUsers.length} usuarios
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-2 sm:px-3 py-2 rounded-lg transition text-sm ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700 transform hover:scale-105'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  {/* Numeración de página */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 sm:px-3 py-2 rounded-lg transition text-sm transform hover:scale-105 ${
                          currentPage === page
                            ? 'bg-yellow-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`flex items-center px-2 sm:px-3 py-2 rounded-lg transition text-sm ${
                      currentPage === totalPages || totalPages === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700 transform hover:scale-105'
                    }`}
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de detalles del usuario seleccionado */}
          {selectedUser && selectedUserData && (
            <div className="w-96 bg-white rounded-xl shadow-sm p-6 h-fit">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Usuario</h3>
                <button 
                  onClick={() => {setSelectedUser(null)}}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Información del usuario */}
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedUserData.name}</h4>
                    <p className="text-gray-500">{selectedUserData.email}</p>
                  </div>
                </div>

                {/* Detalles de membresía */}
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Membresía:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${(selectedUserData?.membership)}`}>
                      {getMembershipName(selectedUserData?.membership)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUserData.membership ? "Activo" : "Suspendido")}`}>
                      {selectedUserData.membership ? "Activo" : "Suspendido"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Fecha de Pago:</span>
                    <span className="text-sm text-gray-900">{formatDate(selectedUserData.date_pay)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Fecha de Vencimiento:</span>
                    <span className="text-sm text-gray-900">{formatDate(selectedUserData.date_expiration)}</span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="pt-4 border-t border-gray-200">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Acciones</h5>
                <div className="space-y-2">

                  <button 
                  onClick={()=> {
                    setShowAddForm2(true);


                    console.log(onlyUser)
                  }}
                  
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="h-4 w-4" />
                    <span>Editar usuario</span>
                  </button>
                  <button 
                  onClick={()=> {
                    SetremoveUser(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar usuario</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal para agregar usuario */}

           <AddUserModal 
              show={showAddForm}
              onClose={() => setShowAddForm(false)}
              onUserAdded={fetchUsers}
            />
               {/* <EditUsertModal
            show={showAddForm2}
            onClose={() => setShowAddForm2(false)}
            onUserEdited= {fetchUsers}
            userSelected={onlyUser}
            />

        <DeleteUserModal
        show={removeUser}
        onClose={()=> SetremoveUser(false)}
        onUserEdited={fetchUsers}
        userSelected={onlyUser}
        /> */}
      </div>
    </div>
  );
}