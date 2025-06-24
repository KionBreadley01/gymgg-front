'use client';

import { Search, User, Mail, Calendar, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function UserManagement() {
  // Estado para almacenar el término de búsqueda introducido por el usuario.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para registrar el ID del usuario que ha sido seleccionado para ver más detalles.
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  // Datos de ejemplo para la lista de usuarios. En una aplicación real, esto vendría de una API.
  const users = [
    {
      id: 1,
      name: 'Gustavo Angel Damian Gonzalez',
      email: 'Gustavo@gmail.com',
      membership: 'Premium',
      paymentDate: '02-05-25',
      endDate: '06-06-25'
    },
    {
      id: 2,
      name: 'Martha Isabel Hernández Fernández',
      email: 'martha@example.com',
      membership: 'Básica',
      paymentDate: '15-05-25',
      endDate: '15-06-25'
    },
    {
      id: 3,
      name: 'Juan Manuel Hernández Sanchez',
      email: 'juan@example.com',
      membership: 'Plus',
      paymentDate: '01-05-25',
      endDate: '01-06-25'
    }
  ];

  // Filtra la lista de usuarios basándose en el término de búsqueda.
  // La búsqueda es insensible a mayúsculas y minúsculas y se aplica sobre el nombre y el email.
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Usuarios</h1>
        
        {/* Barra de búsqueda */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Buscar usuario por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lista de usuarios */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredUsers.map((user) => (
            <div 
              key={user.id}
              className={`border-b border-gray-200 p-6 hover:bg-gray-50 cursor-pointer transition-colors ${selectedUser === user.id ? 'bg-yellow-50' : ''}`}
              onClick={() => setSelectedUser(user.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Información principal */}
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                  </div>
                  <div className="flex items-center mt-2">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                </div>

                {/* Detalles de membresía */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">
                      <span className="font-medium">Membresía:</span> {user.membership}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">
                      <span className="font-medium">Pagada:</span> {user.paymentDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-600">
                      <span className="font-medium">Termina:</span> {user.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sección expandible para usuario seleccionado */}
              {selectedUser === user.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Acciones:</h4>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                      Editar usuario
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                      Renovar membresía
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                      Suspender cuenta
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 