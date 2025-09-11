'use client';

import apiService from '@/app/Service/apiService';
import { data, div, image, p } from 'framer-motion/client';
import { Search, Package, DollarSign, Archive, Edit, Trash2, Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import AddProductModal from '../modal/AddProductModal';
import UpdateProductModal from '../modal/UpdateProductModel';
import DeleteProductModal from '../modal/DeleteProductModal';


export default function Products() {
  // Estado para almacenar el término de búsqueda introducido por el usuario.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para registrar el ID del producto que ha sido seleccionado para ver más detalles.
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [onlyProduct, setOnlyProduct] = useState([]);
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // controla estado de modal de Registro products
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddForm2, setShowAddForm2] = useState(false);
  const [removeProduct, SetremoveProduct] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);
  // Número de productos por página
  const productsPerPage = 5;

  // Definir el tipo de datos y sus atributos
  type Products = {
    id: number,
    name_product: string,  
    price_product: number,
    description: string,
    stock: number,
    category: string
  }
  
  const [product, setProdct] = useState<Products[]>([])
  // Se realiza la peticion al back
  const fetchProducts= async () => {
    try{
        fetch("http://127.0.0.1:8000/products/")
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
              setProdct(data)
            })
          .catch((error) => console.log("Error: ", error)) 

    } catch (error){
      console.log("Error: ", error);
    }
  }


  // Se guardan los datos optenidos de la base de datos
  const products = product.map((m) => ({
    id: m.id,
    name: m.name_product,  
    price: m.price_product,
    description: m.description,
    stock: m.stock,
    category: m.category,
    image: '/assets/images/products/creatine.jpeg'
  }));
  
  // Filtra la lista de productos basándose en el término de búsqueda.
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedProduct(null);
    }
  };


  // Función para manejar la selección/deselección de productos
  const handleProductClick = (productId: number) => {
    if (selectedProduct === productId) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(productId);
      
    }
    return selectedProduct
  };


   const handleProductClickGet = (Getproduct: any) => {
  setOnlyProduct(Getproduct)
    return onlyProduct
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sticky con título y botón agregar */}
      <div className="top-0 z-30 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestión de Productos</h1>
            <button
              onClick={()=> setShowAddForm(true)}
              className="flex items-center px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm sm:text-base w-full sm:w-auto justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Agregar Producto
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda sticky */}
      <div className="top-16 sm:top-20 z-20 bg-gray-50 pt-4 pb-2 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 pt-6">
        {/* Lista de productos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {currentProducts.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              {filteredProducts.length === 0 
                ? "No se encontraron productos que coincidan con tu búsqueda." 
                : "No hay productos en esta página."}
            </div>
          ) : (
            currentProducts.map((product) => (
              <div 
                key={product.id}
                className={`border-b border-gray-200 p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${selectedProduct === product.id ? 'bg-yellow-50' : ''}`}
                onClick={() => {handleProductClick(product.id); handleProductClickGet(product)}}
              >
                {/* ...existing code for product card... */}
                <div className="flex flex-col space-y-4">
                  {/* Header del producto con imagen */}
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1 min-w-0">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.currentTarget.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${product.name.charAt(0)}`;
                          }}
                        />
                      </div>
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-2">
                          <div className="flex items-center min-w-0">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                            <h3 className="text-base sm:text-lg font-medium text-gray-800 truncate">{product.name}</h3>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex-shrink-0 self-start sm:self-center">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-2">{product.description}</p>
                      </div>
                    </div>
                    {/* Indicador de expansión */}
                    <div className="ml-4 flex-shrink-0">
                      {selectedProduct === product.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {/* Detalles del producto */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 ml-0 sm:ml-24">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">Precio:</span> ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Archive className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium">Stock:</span> 
                        <span className={`ml-1 ${product.stock < 20 ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
                          {product.stock}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center sm:col-span-2 lg:col-span-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 50 ? 'bg-green-100 text-green-800' :
                        product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 50 ? 'En Stock' :
                          product.stock > 20 ? 'Stock Medio' :
                          'Stock Bajo'}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Sección expandible para producto seleccionado */}
                {selectedProduct === product.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200 ml-0 sm:ml-24">
                    <h4 className="font-medium text-gray-800 mb-3 text-sm sm:text-base">Acciones:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      <button 
                        className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm justify-center transform hover:scale-105"
                        onClick={()=> {
                          setShowAddForm2(true);
                          setSelectedProduct(product.id);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </button>
                      <button 
                        className="flex items-center px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm justify-center transform hover:scale-105"
                        onClick={(e) => {e.stopPropagation(); SetremoveProduct(true)}}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {/* Paginación - Siempre visible */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Mostrando {filteredProducts.length === 0 ? 0 : Math.min(indexOfFirstProduct + 1, filteredProducts.length)} - {filteredProducts.length === 0 ? 0 : Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} productos
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
        {/* Estadísticas rápidas */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Total de Productos</h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{products.length}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Productos con Stock Bajo</h3>
            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              {products.filter(p => p.stock < 20).length}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md sm:col-span-2 lg:col-span-1 transform hover:scale-105 transition-transform">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Valor Total del Inventario</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              ${products.reduce((total, p) => total + (p.price * p.stock), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        {/* Modal para agregar usuario */}
        <AddProductModal 
          show={showAddForm}
          onClose={() => setShowAddForm(false)}
          onProductAdded={fetchProducts}
        />
        <UpdateProductModal
          show={showAddForm2}
          onClose={() => {setShowAddForm2(false)}}
          onProductAdded={fetchProducts}
          productget={onlyProduct}
        />
        <DeleteProductModal 
          show={removeProduct}
          onClose={()=>SetremoveProduct(false)}
          onProductAdded={fetchProducts}
          productget={onlyProduct}
        />
      </div>
    </div>
  );
}