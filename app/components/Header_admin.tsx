// app/components/Header_admin.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, X, Menu } from 'lucide-react'; // Importa el ícono de hamburguesa
import Link from 'next/link';
import apiService from '../Service/apiService';

const Header_admin = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú de hamburguesa
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setShowConfirmation(true);
  };

  const confirmLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken) {
        await apiService.post("/api/auth/logout/", { refresh: refreshToken });
      }
      router.push("/welcome");
      setShowConfirmation(false);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/dashboard', label: 'Panel' },
    { href: '/dashboard/users', label: 'Usuarios' },
    { href: '/dashboard/products', label: 'Productos' },
    { href: '/memberships', label: 'Membresías' },
    { href: '/dashboard/sales', label: 'Ventas' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
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
            
            {/* Navegación para pantallas grandes */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`transition-colors ${
                    isActiveLink(link.href) 
                      ? 'text-yellow-400 border-b-2 border-yellow-400' 
                      : 'hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Botón de Logout para pantallas grandes */}
            <div className="hidden md:flex">
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-2 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span></span>
              </button>
            </div>

            {/* Botón de Hamburguesa para pantallas pequeñas */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú desplegable para pantallas pequeñas */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900">
            <nav className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map(link => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setMenuOpen(false)}
                  className={`transition-colors w-full text-center py-2 ${
                    isActiveLink(link.href) 
                      ? 'text-yellow-400 bg-gray-800' 
                      : 'hover:text-yellow-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }} 
                className="flex items-center justify-center space-x-2 w-full py-2 text-red-500 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </div>
        )}
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
 