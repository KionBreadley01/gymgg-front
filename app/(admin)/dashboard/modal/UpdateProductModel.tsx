'use client';

import apiService from "@/app/Service/apiService";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

// Definir el tipo de datos y sus atributos

const UpdateProductModal = ({
  show,
  onClose,
  onProductAdded,
  productget


}: {
  show: boolean;
  onClose: () => void;
  onProductAdded: any;
  productget: any

}) => {

  const [dataid, setDataid] = useState('');
  const [dataTitle, setDataTitle] = useState('');
  const [dataPrice, setDataPrice] = useState('');
  const [dataStock, setDataStock] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataCategory, setDataCategory] = useState('');
  const [Category, setCategory] = useState<{ id: string; name_category: string }[]>([]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (show) {
      fetch('http://localhost:8000/products/categories/') // ajusta la URL según tu backend
        .then(res => res.json())
        .then(data => setCategory(data))
        .catch(err => console.error('Error cargando categorías', err));
    }
  }, [show]);


  useEffect(() => {
    if (productget && show) {
      setDataid(productget.id || '')
      setDataTitle(productget.name || '');
      setDataPrice(String(productget.price || ''));
      setDataStock(String(productget.stock || ''));
      setDataDescription(productget.description || '');
      setDataCategory(productget.category || '');
      setPreviewUrl(productget.image_url || null);
      setSelectedImage(null);
    }
  }, [productget, show]);


  const resetForm = () => {
    setDataTitle('');
    setDataPrice('');
    setDataStock('');
    setDataDescription('');
    setDataCategory('');
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const cloudName = "gymgg"; // Lowercase
    const apiKey = "664889547226734";
    const apiSecret = "0elwoQUffmpg0RW2cNztlLpfrns";
    const timestamp = Math.round((new Date()).getTime() / 1000);

    // Generate signature
    const paramsToSign = `timestamp=${timestamp}${apiSecret}`;
    const signature = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(paramsToSign))
      .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        console.error("Cloudinary error data:", data);
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const submitForm = async () => {
    if (
      dataTitle &&
      dataPrice &&
      dataDescription &&
      dataStock &&
      dataCategory
    ) {
      setIsUploading(true);
      let imageUrl = previewUrl; // Default to existing URL

      if (selectedImage) {
        try {
          imageUrl = await uploadImageToCloudinary(selectedImage);
        } catch (error: any) {
          toast.error(`Error subiendo la imagen: ${error.message}`);
          setIsUploading(false);
          return;
        }
      }

      const form = {
        name_product: dataTitle,
        price_product: parseFloat(dataPrice),
        description: dataDescription,
        stock: parseInt(dataStock),
        category: dataCategory,
        image_url: imageUrl,
      };

      const response = await apiService.update(`/products/update/${dataid}`, form)


      if (response.id) {
        console.log('Producto actualizado correctamente');
        toast.success('Producto actualizado exitosamente');
        onProductAdded();
        onClose(); // Cerrar modal
      } else {
        console.log(response)
        toast.error('Error al actualizar el producto');
      }
      setIsUploading(false);

    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4  bg-black/60">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Editar Producto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="p-6 space-y-4">

          {/* Image Upload Section */}
          <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="dropzone-file-update" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir imagen</span></p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                </div>
              )}
              <input id="dropzone-file-update" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
            {(selectedImage || previewUrl) && (
              <button
                type="button"
                onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
                className="mt-2 text-xs text-red-500 hover:text-red-700"
              >
                Remover imagen
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre producto</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nombre"
              value={dataTitle}
              onChange={(e) => setDataTitle(e.target.value)}
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
              <option value=''>selecciona</option>
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
                type="text"
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
              onClick={() => { onClose(); resetForm(); }}
              disabled={isUploading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 flex items-center justify-center"
            >
              {isUploading ? 'Actualizando...' : 'Actualizar Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
