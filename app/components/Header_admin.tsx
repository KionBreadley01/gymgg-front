// app/components/Header_admin.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import Link from 'next/link';

const Header_admin = () => {
  // Estado para controlar la visibilidad del diálogo de confirmación de cierre de sesión.
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Hook de Next.js para manejar la navegación programática.
  const router = useRouter();

  // Muestra el diálogo de confirmación.
  const handleLogout = () => {
    setShowConfirmation(true);
  };

  // Redirige al usuario a la página de bienvenida y oculta el diálogo.
  const confirmLogout = () => {
    router.push('/welcome');
    setShowConfirmation(false);
  };

  // Simplemente oculta el diálogo de confirmación.
  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          {/* Logo, Title and Navigation in one row */}
          <div className="flex items-center justify-between w-full">
            <Link href="/dashboard" className="flex items-center">
              <img 
                src="/Logo.png" 
                alt="Logo GymGG" 
                className="h-10 w-10 rounded-full border-2 border-yellow-500"
              />
              <span className="ml-2 text-xl font-bold">
                GymsGG <span className="text-yellow-400">Admin</span>
              </span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">
                Panel
              </Link>
              <Link href="/dashboard/users" className="hover:text-yellow-400 transition-colors">
                Usuarios
              </Link>
              <Link href="/dashboard/products" className="hover:text-yellow-400 transition-colors">
                Productos
              </Link>
             <Link href="/memberships" className="hover:text-yellow-400 transition-colors">
                Membresías
              </Link>
              <Link href="/dashboard/Sales" className="hover:text-yellow-400 transition-colors">
                Ventas
              </Link>
            </nav>

            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-6 w-6" />
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Cerrar Sesión</h2>
              <button
                onClick={cancelLogout}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500">Se cerrará tu sesión actual</p>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header_admin; 