'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AddMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (membership: any) => void;
}

export default function AddMembershipModal({ isOpen, onClose, onSubmit }: AddMembershipModalProps) {
  const [newMembership, setNewMembership] = useState({
    name: '',
    price: '',
    duracion_membresia: 'mensual',
    ofertas_membresia: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const membershipToAdd = {
      ...newMembership,
      ofertas_membresia: newMembership.ofertas_membresia.filter(oferta => oferta.trim() !== '')
    };
    onSubmit(membershipToAdd);
    setNewMembership({
      name: '',
      price: '',
      duracion_membresia: 'mensual',
      ofertas_membresia: ['']
    });
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setNewMembership(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addOferta = () => {
    setNewMembership((prev: any) => ({
      ...prev,
      ofertas_membresia: [...prev.ofertas_membresia, '']
    }));
  };

  const updateOferta = (index: number, value: string) => {
    const newOfertas = [...newMembership.ofertas_membresia];
    newOfertas[index] = value;
    setNewMembership((prev: any) => ({
      ...prev,
      ofertas_membresia: newOfertas
    }));
  };

  const removeOferta = (index: number) => {
    setNewMembership((prev: any) => ({
      ...prev,
      ofertas_membresia: prev.ofertas_membresia.filter((_: any, i: number) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Agregar Nueva Membresía</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la membresía
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Membresía Premium"
              value={newMembership.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: $1,199 MXN/mes"
              value={newMembership.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newMembership.duracion_membresia}
              onChange={(e) => handleInputChange('duracion_membresia', e.target.value)}
            >
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          {/* Ofertas de membresía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ofertas de membresía
            </label>
            <div className="space-y-2">
              {newMembership.ofertas_membresia.map((oferta, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Oferta"
                    value={oferta}
                    onChange={(e) => updateOferta(index, e.target.value)}
                  />
                  {newMembership.ofertas_membresia.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOferta(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addOferta}
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