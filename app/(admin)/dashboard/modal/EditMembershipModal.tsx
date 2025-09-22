'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import apiService from '@/app/Service/apiService';
import { toast } from 'react-toastify';


interface EditMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  membership: any;
  onMembership: ()=>void;
  
}

export default function EditMembershipModal({ isOpen, onClose, onMembership, membership }: EditMembershipModalProps) {

  const [dataid, setDataid] = useState('');

const [memNombre, setMemNombre] = useState("");
const [memprice, setMemPrice ]= useState("");
const [memduracion, setMemDuracion ]= useState("");
const [memstatus, setMemStatus ]= useState(false);

const [memoffers, setMemOffers ]= useState<String[]>([]);



useEffect(() => {
  if (membership && isOpen) {
    setDataid(membership.id || '');
    setMemNombre(membership.name || '');
    setMemPrice(String(membership.price || ''));
    setMemDuracion(membership.duration || '');
    setMemStatus(membership.status || true);
    setMemOffers(membership.ofertas_membresia || []);
  
  }
}, [membership, isOpen]);


  const submitForm = async () => {
    if (
      memNombre &&
      memprice &&
      memduracion &&
      memoffers ||
      memstatus 
    ) {
   const form = {
      name_membership: memNombre,
      price_membership: parseFloat(memprice),
      duration_membership: memduracion,
      offers_membership: memoffers,
   status_membership:memstatus
          };
    const response = await apiService.update(`/membership/update/${dataid}`,form)
      console.log("response"+response)

      if (response.id) {
toast.success(`Membresia ${memNombre} fue editada correctamente`)
        onMembership();
    onClose();
   // Cerrar modal
      } else {

       console.log(response)
      }

    }else{
 
      console.log("error");
    }
  };



const removeEditOferta = (index: number) => {
  setMemOffers((prev: String[]) => prev.filter((_, i) => i !== index));
};



  
const addEditOferta = () => {
  console.log(memoffers)
  setMemOffers((prev: String[]) => [...prev, '']);
};

// Actualizar el texto de una oferta en un índice
const updateEditOferta = (index: number, value: string) => {
  setMemOffers((prev: String[]) => {
    const newOfertas = [...prev];
    newOfertas[index] = value;
    return newOfertas;
  });
};



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[70vh] overflow-hidden border border-gray-200 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">Editar Membresía</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={(e)=> {e.preventDefault(); submitForm()}} className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Columna izquierda */}
            <div className="space-y-3">
              {/* Nombre */}
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la membresía
                </label>
                <input
                  type="text"
                  id="edit-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Membresía Premium"
                  value={memNombre}
                  onChange={(e) =>setMemNombre(e.target.value)}
                />
              </div>

              {/* Precio */}
              <div>
                <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio
                </label>
                <input
                  type="text"
                  id="edit-price"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: $1,199 MXN/mes"
                  value={memprice}
                  onChange={(e) => setMemPrice(e.target.value)}
                />
              </div>

              {/* Duración de membresía */}
              <div>
                <label htmlFor="edit-duracion" className="block text-sm font-medium text-gray-700 mb-2">
                  Duración de membresía
                </label>
                <select
                  id="edit-duracion"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={memduracion}
                  onChange={(e) => setMemDuracion(e.target.value)}
                >
                  <option value="Mensual">Mensual</option>
                  <option value="Anual">Anual</option>
                </select>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-3">
              {/* Ofertas de membresía */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ofertas de membresía
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {memoffers.map((offer:String, index) => (
                    <div 
                    key={index}
                    className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Oferta"
                        value={offer.toString()}
                        onChange={(e) => {updateEditOferta(index, e.target.value)}}
                      />
                      {memoffers.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {removeEditOferta(index)}}
                          className="px-3 py-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={()=>{addEditOferta()}}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Agregar oferta
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4 flex-shrink-0">
            <button
              type="button"
              
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
            
              type="submit"
              onClick={(e)=>{
                console.log("hola")
                submitForm;
              } }
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Actualizar Membresía
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
} 