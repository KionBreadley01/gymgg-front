'use client';

import apiService from "@/app/Service/apiService";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


const AddProductModal =({
  show,
  onClose,
  onProductAdded, 
}: {
  show: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}) => {
  const [dataTitle, setDataTitle] = useState('');
  const [dataPrice, setDataPrice] = useState('');
  const [dataStock, setDataStock] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataCategory, setDataCategory] = useState('');
  const [Category, setCategory] = useState<{id:string; name_category:string}[]>([]);



useEffect(() => {
  fetch('http://localhost:8000/products/categories/') // ajusta la URL según tu backend
    .then(res => res.json())
    .then(data => setCategory(data))
    .catch(err => console.error('Error cargando categorías', err));
 
}, []);

const resetForm = () => {
  setDataTitle('');
  setDataPrice('');
  setDataStock('');
  setDataDescription('');
  setDataCategory('');
};



  const submitForm = async () => {
    if (
      dataTitle &&
      dataPrice &&
      dataDescription &&
      dataStock &&
    dataCategory
    ) {
   const form = {
      name_product: dataTitle,
      price_product: parseFloat(dataPrice),
      description: dataDescription,
      stock: parseInt(dataStock),
      category: dataCategory,
    };

    
      const response = await apiService.post('/products/create', form);


      if (response && response.id) {
                toast.success('Producto Añadido correctamente');
        
       onProductAdded();
       resetForm();
        onClose(); // Cerrar modal
      } else {
      
        console.warn('llego aqui?',response);
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4  bg-black/60">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Agregar Nuevo Producto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre producto</label>
            <input
              type="text"
              name="name"
              value={dataTitle}
              onChange={(e) => setDataTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
           {/* <input type="number"
           value={dataCategory}
           onChange={(e)=> setDataCategory(e.target.value)}
           /> */}
           
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={dataCategory}
              onChange={(e) => setDataCategory(e.target.value)}
            >
              <option value="">Selecciona</option>
              {Category.map(cat => (
                
                <option key={cat.id} value={cat.name_category}>{cat.name_category}</option>
              ))
            
              }
          
            </select>
          </div>

          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="00.00"
                value={dataPrice}
               onChange={(e) => {
                const value = e.target.value;
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      setDataPrice(value);
                    }
                }}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                value={dataStock}
                onChange={(e) => setDataStock(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descripción del producto"
              value={dataDescription}
              onChange={(e) => setDataDescription(e.target.value)}
            />
          </div>

          

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
            
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
