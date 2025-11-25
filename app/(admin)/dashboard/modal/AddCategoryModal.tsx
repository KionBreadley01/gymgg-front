'use client';

import { X } from "lucide-react";
import { useState } from "react";
import apiService from "@/app/Service/apiService";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  show: boolean;
  onClose: () => void;
onProductAdded: (newCategory: { id: string; name_category: string }) => void;

}

const AddCategoryModal = ({ show, onClose,onProductAdded  }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('');

  const submitForm = async () => {
    if (
      categoryName
    ) {
   const form = {
      name_category:categoryName
    };
      const response = await apiService.post('/products/categories/create', form);
        console.log("si hay respuesta "+ response)

      if (response && response.id) {
                toast.info('Categoria Añadida correctamente');
                onProductAdded(response);
                onClose(); // Cerrar modal
               
      } else {
      
     
        toast.error("ocurrio un error")
      }
    } else{
              

    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-black mb-4">Agregar Categoría</h2>

        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Nombre de la categoría"
          required
        />

        <button
        onClick={
            submitForm}

          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
