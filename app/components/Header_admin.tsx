// app/components/Header_admin.tsx
import { UserCircle } from "lucide-react";
import Link from 'next/link';

const Header_admin = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
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
        </div>

        <nav className="flex items-center space-x-6">
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
          <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">
            <UserCircle className="h-8 w-8" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header_admin; 