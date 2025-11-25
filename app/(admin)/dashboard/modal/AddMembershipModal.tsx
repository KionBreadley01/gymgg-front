'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import apiService from '@/app/Service/apiService';
import { toast } from 'react-toastify';

interface AddMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMembership: () => void;
}

export default function AddMembershipModal({ isOpen, onClose, onMembership }: AddMembershipModalProps) {

const [memNombre, setMemNombre] = useState("");
const [memprice, setMemPrice ]= useState("");
const [memduracion, setMemDuracion ]= useState("");
const [memstatus, setMemStatus ]= useState(false);

const [memoffers, setMemOffers ]= useState<String[]>(["Acceso al gym"]);



const resetForm = () => {
  setMemNombre('');
  setMemPrice('');
  setMemDuracion('');
  setMemStatus(false);
  setMemOffers([]);
};


const submitForm = async () => {
  if (
    memNombre.trim() &&
    memprice.trim() &&
    memduracion.trim() &&
    Array.isArray(memoffers)
  ) {
    const form = {
      name_membership: memNombre,
      price_membership: parseFloat(memprice),
      duration_membership: memduracion,
      offers_membership: memoffers,
      status_membership: memstatus
    };
    
    console.log("Enviando:", form);
    
    try {
      const response = await apiService.post('/membership/create', form);
      console.log("response", response);
  
      if (response?.id) {
     toast.success("Membresia agregada");
        onMembership();
        resetForm();
        onClose();
      } else {
        toast.dismiss()
      toast.error("Error al crear membresía");
      }

    } catch (error) {
      toast.error("Error al crear membresía sii");
    }
    
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Agregar Nueva Membresía</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitForm(); console.log("si llege")}} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la membresía
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Membresía Premium"
              value={memNombre}
              onChange={(e) => setMemNombre(e.target.value)}
            />
          </div>

          {/* Precio */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Precio
            </label>
            <input
              type="text"
              id="price"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: $1,199 MXN/mes"
              value={memprice}
              onChange={(e) => setMemPrice( e.target.value)}
            />
          </div>

          {/* Duración de membresía */}
          <div>
            <label htmlFor="duracion" className="block text-sm font-medium text-gray-700 mb-2">
              Duración de membresía
            </label>
            <select
              id="duracion"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={memduracion}
              onChange={(e) => setMemDuracion( e.target.value)}
            >                  <option value="">Selecionar</option>

              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>
            </select>
          </div>

          {/* Ofertas de membresía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ofertas de membresía
            </label>
            <div className="space-y-2">
              {memoffers.map((oferta, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Oferta"
                    value={oferta.toString()}
                    onChange={(e) => updateEditOferta(index, e.target.value)}
                  />
                  {memoffers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEditOferta(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={()=>{addEditOferta(); resetForm}}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Agregar oferta
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
            
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar Membresía
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 