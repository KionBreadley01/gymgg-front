'use client';

import { UserCircle } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 py-6 md:py-8 bg-gray-900">
      <div className="flex items-center justify-between text-lg font-medium">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/welcome">
            <img src="/Logo.png" alt="Logo" className="h-12 w-12 rounded-full object-cover" />
          </Link>
        </div>

        {/* Navegación */}
        <div className="flex items-center space-x-6 text-lg font-medium relative">
          <Link
            href="/welcome"
            className="text-white border-b-2 border-yellow-500 pb-2 hover:text-yellow-400 transition-colors"
          >
            Inicio
          </Link>

          <Link
            href="/memberships"
            className="text-white border-b-2 border-yellow-500 pb-2 hover:text-yellow-400 transition-colors"
          >
            Membresías
          </Link>

          {/* Menú desplegable de usuario */}
          <div className="relative">
            <button onClick={toggleMenu}>
              <UserCircle className="h-8 w-8 text-white hover:text-yellow-400 transition-colors" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-yellow-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-gray-800 hover:bg-yellow-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
