// app/components/Header.tsx
import { UserCircle } from "lucide-react";
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 py-6 md:py-8 bg-gray-900">
      <div className="flex items-center justify-between text-lg font-medium">
        <div className="flex items-center space-x-2">
          <Link href="/welcome">
            <img src="/Logo.png" alt="Logo" className="h-12 w-12 rounded-full object-cover" />
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