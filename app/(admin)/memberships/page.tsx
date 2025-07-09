// app/pages/memberships/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import AddMembershipModal from '../dashboard/modal/AddMembershipModal';
import EditMembershipModal from '../dashboard/modal/EditMembershipModal';
import DeleteMembershipModal from '../dashboard/modal/DeleteMembershipModal';

export default function Memberships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<any>(null);

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Membresía Básica',
      price: '$499 MXN/mes',
      duracion_membresia: 'mensual',
      ofertas_membresia: [
        'Acceso a área de cardio',
        'Uso de máquinas básicas',
        'Horario matutino (6am-2pm)',
        'Asesoría inicial gratuita'
      ],
      status: 'Activa'
    },
    {
      id: 2,
      name: 'Membresía Plus',
      price: '$799 MXN/mes',
      duracion_membresia: 'mensual',
      ofertas_membresia: [
        'Acceso a todas las áreas',
        'Uso ilimitado de máquinas',
        'Horario extendido (6am-10pm)',
        'Clases grupales incluidas',
        '1 sesión de entrenador personal'
      ],
      status: 'Activa'
    },
    {
      id: 3,
      name: 'Membresía Premium',
      price: '$1,199 MXN/mes',
      duracion_membresia: 'anual',
      ofertas_membresia: [
        'Acceso 24/7',
        'Uso de área VIP',
        'Toalla y locker incluidos',
        'Clases ilimitadas',
        '4 sesiones de entrenador personal',
        'Evaluación física mensual'
      ],
      status: 'Activa'
    },
  ]);

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMembership = (membership: any) => {
    const newId = Math.max(...plans.map(p => p.id)) + 1;
    const membershipToAdd = {
      ...membership,
      id: newId,
      status: 'Activa'
    };
    setPlans([...plans, membershipToAdd]);
    alert('Membresía agregada exitosamente');
    setShowAddModal(false);
  };

  const handleEditMembership = (membership: any) => {
    const updatedPlans = plans.map(plan => 
      plan.id === selectedMembership.id 
        ? { ...membership, id: selectedMembership.id, status: selectedMembership.status }
        : plan
    );
    setPlans(updatedPlans);
    alert('Membresía actualizada exitosamente');
    setShowEditModal(false);
    setSelectedMembership(null);
  };

  const handleDeleteMembership = () => {
    const updatedPlans = plans.filter(plan => plan.id !== selectedMembership.id);
    setPlans(updatedPlans);
    alert('Membresía eliminada exitosamente');
    setShowDeleteModal(false);
    setSelectedMembership(null);
  };

  const openEditModal = (membership: any) => {
    setSelectedMembership(membership);
    setShowEditModal(true);
  };

  const openDeleteModal = (membership: any) => {
    setSelectedMembership(membership);
    setShowDeleteModal(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Membresías</h1>
          <p className="text-gray-600">Administra las membresías disponibles</p>
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
                placeholder="Buscar membresía..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botón agregar membresía */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Membresía</span>
            </button>
          </div>
        </div>

        {/* Tabla de membresías */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membresía
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ofertas
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">{plan.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        plan.duracion_membresia === 'mensual' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {plan.duracion_membresia === 'mensual' ? 'Mensual' : 'Anual'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <ul className="list-disc list-inside space-y-1">
                          {plan.ofertas_membresia.slice(0, 3).map((oferta, i) => (
                            <li key={i} className="text-gray-600">{oferta}</li>
                          ))}
                          {plan.ofertas_membresia.length > 3 && (
                            <li className="text-blue-600">+{plan.ofertas_membresia.length - 3} más</li>
                          )}
                        </ul>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {plan.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openEditModal(plan)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteModal(plan)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modales */}
        <AddMembershipModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddMembership}
        />

        <EditMembershipModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditMembership}
          membership={selectedMembership}
        />

        <DeleteMembershipModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteMembership}
          membership={selectedMembership}
        />
      </div>
    </div>
  );
} 