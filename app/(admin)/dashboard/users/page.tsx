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
import { useState } from 'react';

// Tipos de datos
interface UserData {
  id: number;
  name: string;
  email: string;
  membership: 'Premium' | 'Plus' | 'Básica';
  paymentDate: string;
  endDate: string;
  status: 'Activo' | 'Suspendido';
}

interface NewUser {
  name: string;
  email: string;
  membership: 'Premium' | 'Plus' | 'Básica';
  status: 'Activo' | 'Suspendido';
}

export default function UserManagement() {
  // Estados principales
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [filterMembership, setFilterMembership] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    membership: 'Básica',
    status: 'Activo'
  });

  // Configuración de paginación
  const usersPerPage = 5;

  // Datos de ejemplo para la lista de usuarios
  const users: UserData[] = [
    {
      id: 1,
      name: 'Gustavo Angel Damian Gonzalez',
      email: 'Gustavo@gmail.com',
      membership: 'Premium',
      paymentDate: '02-05-25',
      endDate: '06-06-25',
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Martha Isabel Hernández Fernández',
      email: 'martha@example.com',
      membership: 'Básica',
      paymentDate: '15-05-25',
      endDate: '15-06-25',
      status: 'Activo'
    },
    {
      id: 3,
      name: 'Juan Manuel Hernández Sanchez',
      email: 'juan@example.com',
      membership: 'Plus',
      paymentDate: '01-05-25',
      endDate: '01-06-25',
      status: 'Suspendido'
    },
    {
      id: 4,
      name: 'Ana María López Torres',
      email: 'ana@example.com',
      membership: 'Premium',
      paymentDate: '20-05-25',
      endDate: '20-06-25',
      status: 'Activo'
    },
    {
      id: 5,
      name: 'Carlos Eduardo Morales',
      email: 'carlos@example.com',
      membership: 'Básica',
      paymentDate: '10-05-25',
      endDate: '10-06-25',
      status: 'Activo'
    },
  ];

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
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    console.log('Nuevo usuario:', newUser);
    alert('Usuario agregado exitosamente');
    
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
                  {currentUsers.map((user) => (
                    <tr 
              key={user.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        selectedUser === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
              onClick={() => setSelectedUser(user.id)}
            >
                      <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(user.membership)}`}>
                          {user.membership}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación - Siempre visible */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                  Mostrando {Math.min(indexOfFirstUser + 1, filteredUsers.length)} - {Math.min(indexOfLastUser, filteredUsers.length)} de {filteredUsers.length} usuarios
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
                  onClick={() => setSelectedUser(null)}
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
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(selectedUserData.membership)}`}>
                      {selectedUserData.membership}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUserData.status)}`}>
                      {selectedUserData.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Fecha de Pago:</span>
                    <span className="text-sm text-gray-900">{selectedUserData.paymentDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Fecha de Vencimiento:</span>
                    <span className="text-sm text-gray-900">{selectedUserData.endDate}</span>
                </div>
              </div>

                {/* Acciones */}
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-900 mb-3">Acciones</h5>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Ver detalles</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                      <Edit className="h-4 w-4" />
                      <span>Editar usuario</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Trash2 className="h-4 w-4" />
                      <span>Eliminar usuario</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal para agregar usuario */}
        {showAddForm && (
          <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Agregar Nuevo Usuario</h3>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa el nombre completo"
                    value={newUser.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ejemplo@email.com"
                    value={newUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                {/* Membresía */}
                <div>
                  <label htmlFor="membership" className="block text-sm font-medium text-gray-700 mb-2">
                    Membresía
                  </label>
                  <select
                    id="membership"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={newUser.membership}
                    onChange={(e) => handleInputChange('membership', e.target.value as 'Premium' | 'Plus' | 'Básica')}
                  >
                    <option value="Básica">Básica</option>
                    <option value="Plus">Plus</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                {/* Estado */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    id="status"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    value={newUser.status}
                    onChange={(e) => handleInputChange('status', e.target.value as 'Activo' | 'Suspendido')}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Suspendido">Suspendido</option>
                  </select>
                </div>

                {/* Botones */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleAddUser}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Agregar Usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 