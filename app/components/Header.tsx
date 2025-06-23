// app/components/Header.tsx
import { UserCircle } from "lucide-react";
import Link from 'next/link';

// Componente que renderiza el encabezado principal para usuarios no autenticados o clientes.
const Header = () => {
  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 py-6 md:py-8 bg-gray-900">
      <div className="flex items-center justify-between text-lg font-medium">
       <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center">
            <img 
              src="/Logo.png" 
              alt="Logo GymGG" 
              className="h-10 w-10 rounded-full border-2 border-yellow-500"
            />
            <span className="ml-2 text-xl font-bold">
              GymsGG 
            </span>
          </Link>
        </div>

        <div className="flex space-x-6 text-lg font-medium">
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

          <Link href="/login">
            <UserCircle className="h-8 w-8 text-white hover:text-yellow-400 transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;