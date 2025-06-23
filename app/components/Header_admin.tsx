// app/components/Header_admin.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
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
        <div className="container mx-auto px-4 py-4 flex flex-col items-center">
          {/* Logo and Title */}
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
            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
            >
              <LogOut className="h-6 w-6" />
              <span></span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6 mt-4">
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
        </div>
      </header>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-800">
            <h2 className="text-xl font-bold mb-4">¿Quieres Cerrar sesión?</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                SI
              </button>
              <button
                onClick={cancelLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header_admin; 