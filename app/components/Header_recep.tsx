// app/components/Header_admin.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, X } from 'lucide-react';
import Link from 'next/link';
import apiService from '../Service/apiService';

const Header_recep = () => {
  // Estado para controlar la visibilidad del diálogo de confirmación de cierre de sesión.
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Hook de Next.js para manejar la navegación programática.
  const router = useRouter();
  // Hook para obtener la ruta actual
  const pathname = usePathname();



  // Muestra el diálogo de confirmación.
  const handleLogout = () => {

    setShowConfirmation(true);
  };

  // Redirige al usuario a la página de bienvenida y oculta el diálogo.
const confirmLogout = async () => {
  try {
// cargar token guardada en local
    const refreshToken = localStorage.getItem("refresh");

    console.log(refreshToken)
    if (refreshToken) {
      await apiService.post("/api/auth/logout/", {refresh: refreshToken,});
    }

    // Limpiar tokens del almacenamiento local

   
    router.push("/welcome");
    setShowConfirmation(false);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");


  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
  // Simplemente oculta el diálogo de confirmación.
  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  // Función para determinar si un enlace está activo
  const isActiveLink = (href: string) => {
    const segments = href.split('/').filter(Boolean).length;
    if (segments <= 1) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          {/* Logo, Title and Navigation in one row */}
          <div className="grid grid-cols-3 items-center w-full">
            <Link href="/dashboard2" className="flex items-center">
              <img 
                src="/Logo.png" 
                alt="Logo GymGG" 
                className="h-10 w-10 rounded-full border-2 border-yellow-500"
              />
              <span className="ml-2 text-xl font-bold">
                GymsGG <span className="text-yellow-400">Recepcionista</span>
              </span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="flex items-center justify-center space-x-6">
              <Link 
                href="/dashboard2" 
                className={`transition-colors ${
                  isActiveLink('/dashboard2') 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'hover:text-yellow-400'
                }`}
              >
                Panel
              </Link>
              <Link 
                href="/dashboard2/usersRecep" 
                className={`transition-colors ${
                  isActiveLink('/dashboard2/usersRecep') 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'hover:text-yellow-400'
                }`}
              >
                Usuarios
              </Link>
              <Link 
                href="/dashboard2/productsRece" 
                className={`transition-colors ${
                  isActiveLink('/dashboard2/productsRece') 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'hover:text-yellow-400'
                }`}
              >
                Productos
              </Link>
              <Link 
                href="/dashboard2/membershipsRecep" 
                className={`transition-colors ${
                  isActiveLink('/dashboard2/membershipsRecep') 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'hover:text-yellow-400'
                }`
              }
              >
                Membresías
              </Link>
              <Link 
                href="/dashboard2/salesRecep" 
                className={`transition-colors ${
                  isActiveLink('/dashboard2/salesRecep') 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'hover:text-yellow-400'
                }`}
              >
                Ventas
              </Link>
            </nav>

            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 hover:text-red-400 transition-colors justify-self-end"
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

export default Header_recep;