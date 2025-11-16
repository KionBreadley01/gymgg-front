// app/dashboard/sales/page.tsx
'use client'

import { Search, ShoppingCart, DollarSign, Calendar, User, Eye, FileText, Plus, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddSaleModal from '@/app/(receptionist)/dashboard2/modal/salesModal/AddSaleModal'
import DeleteSaleModal from '../modal/salesModal/DeleteSaleModal';

export default function SalesPage() {


  
  // Estado para almacenar el término de búsqueda introducido por el usuario.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para registrar el ID de la venta que ha sido seleccionada para ver más detalles.
  const [selectedSale, setSelectedSale] = useState<number | null>(null);
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para filtro de fecha
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  const [showAddForm, setShowAddForm] = useState(false);
  const [removeSale, SetremoveSale] = useState(false);
  const [onlySale, setOnlySale] = useState([]);

  // Número de ventas por página
  const salesPerPage = 8;

  useEffect(() => {
    fetchSale();
  }, []);

  // Definir el tipo de datos y sus atributos
  type SaleItem = {
    id: number;
    name_product: string;
    product: {
      id: string;
      name_product: string;
      price_product: string;
      description: string;
      stock: number;
      total_price_p: number
    };
    quantity: number;
    unit_price: string;
    total_price: string;
  };

  type UserName = {
    id: string;
    name: string;
  };

  type Sale = {
    id: number,
    user: string | UserName,
    user_email: String,
    items: SaleItem[],
    total_price: number,
    created_at: string,
  }

  const [sale, setSales] = useState<Sale[]>([])

  // Se realiza la peticion al back (simulada con datos de ejemplo)
  const fetchSale= async () => {
               const token = localStorage.getItem('access');

    try{
      fetch("http://127.0.0.1:8000/Sales/",{

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
            setSales(data)
          })
        .catch((error) => console.log("Error: ", error)) 

    } catch (error){
      console.log("Error: ", error);
    }
  }

  // Se guardan los datos optenidos de la base de datos
  const sales = sale.map((m) => ({
    id: m.id,
    user: typeof m.user === "object" ? m.user : { name: m.user, id: m.user },
    user_email: m.user_email || "",
    items: m.items,
    total_price: Number(m.total_price),
    status: "completed",
    created_at: m.created_at,
  }));

  // Función para formatear fecha
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }
  
  const datePart = date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('es-MX', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  return `${datePart} - ${timePart}`;
}

  // Función para filtrar por fecha
  const filterByDate = (sale: Sale) => {
    if (dateFilter === 'all') return true;
    
    const saleDate = new Date(sale.created_at);
    const now = new Date();
    
    switch (dateFilter) {
      case 'today':
        return saleDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return saleDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return saleDate >= monthAgo;
      default:
        return true;
    }
  };

  // Filtra la lista de ventas basándose en el término de búsqueda y filtro de fecha.
  const filteredSales = sales.filter(sale =>
    (
      sale.total_price.toString().includes(searchTerm) ||
      sale.status.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByDate(sale)
    )
  );

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredSales.length / salesPerPage);
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedSale(null);
    }
  };

  // Resetear página cuando se realiza una búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSelectedSale(null);
  };

  // Función para manejar el filtro de fecha
  const handleDateFilterChange = (filter: string) => {
    setDateFilter(filter);
    setCurrentPage(1);
    setSelectedSale(null);
  };

  // Función para manejar la selección/deselección de ventas
  const handleSaleClick = (saleId: number) => {
    if (selectedSale === saleId) {
      setSelectedSale(null);
    } else {
      setSelectedSale(saleId);
    }
  };

  const handleSaleClickGet = (Getsale: any) => {
    setOnlySale(Getsale)
      return onlySale
  }

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sticky con título y botón agregar */}
      <div className="top-0 z-30 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestión de Ventas</h1>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm sm:text-base w-full sm:w-auto justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Nueva Venta
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros sticky */}
      <div className="top-16 sm:top-20 z-20 bg-gray-50 pt-4 pb-2 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barra de búsqueda */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Buscar venta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filtros de fecha */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'Todas', icon: Calendar },
                { value: 'today', label: 'Hoy', icon: Calendar },
                { value: 'week', label: '7 días', icon: Calendar },
                { value: 'month', label: '30 días', icon: Calendar }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleDateFilterChange(filter.value)}
                  className={`flex items-center px-3 py-2 rounded-lg transition text-sm ${
                    dateFilter === filter.value
                      ? 'bg-yellow-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <filter.icon className="h-4 w-4 mr-1" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 pt-6">
        {/* Lista de ventas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {currentSales.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              {filteredSales.length === 0 
                ? "No se encontraron ventas que coincidan con tu búsqueda." 
                : "No hay ventas en esta página."}
            </div>
          ) : (
            currentSales.map((sale) => (
              <div 
                key={sale.id}
                className={`border-b border-gray-200 p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${selectedSale === sale.id ? 'bg-yellow-50' : ''}`}
                onClick={() => {handleSaleClick(sale.id); handleSaleClickGet(sale)}}
              >
                {/* ...existing code for sale card... */}
                <div className="flex flex-col space-y-4">
                  {/* Header de la venta */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-2">
                        <div className="flex items-center min-w-0">
                          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mr-2 flex-shrink-0" />
                          <h3 className="text-base sm:text-lg font-medium text-gray-800">
                            {/* Venta #{sale.id.toString().padStart(4, '0')} */}
                            Venta
                          </h3>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{sale.user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{sale.user_email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base">
                            <span className="font-bold text-green-600">${sale.total_price.toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {formatDate(sale.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Indicador de expansión */}
                    <div className="ml-4 flex-shrink-0">
                      {selectedSale === sale.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                {/* Sección expandible para venta seleccionada */}
                {selectedSale === sale.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
                    {/* Detalles de los productos */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-3 text-sm sm:text-base">Productos:</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {sale.items?.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 text-sm">{item.name_product}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} x ${item.unit_price}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-800 text-sm">
                                ${item.product.price_product}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-300">
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-800">Total:</p>
                            <p className="font-bold text-green-600 text-lg">
                              ${sale.total_price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Acciones */}
                    <h4 className="font-medium text-gray-800 mb-3 text-sm sm:text-base">Acciones:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      <button 
                        className="flex items-center px-3 sm:px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-sm justify-center transform hover:scale-105"
                        onClick={(e) => {e.stopPropagation(); SetremoveSale(true)}}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Reembolso
                      </button>
                      <button 
                        className="flex items-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm justify-center transform hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Vendedor
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
                Mostrando {filteredSales.length === 0 ? 0 : Math.min(indexOfFirstSale + 1, filteredSales.length)} - {filteredSales.length === 0 ? 0 : Math.min(indexOfLastSale, filteredSales.length)} de {filteredSales.length} ventas
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
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Total de Ventas</h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{sales.length}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform">
            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Ingresos Totales</h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">
              ${sales.filter(s => s.status === 'completed').reduce((total, s) => total + s.total_price, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal para agregar usuario */}
      <AddSaleModal 
        show={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSaleAdded={fetchSale}
      />

      <DeleteSaleModal
        show={removeSale}
        onClose={()=>SetremoveSale(false)}
        onSaleAdded={fetchSale}
        saleget={onlySale}
      />

    </div>
  );
}