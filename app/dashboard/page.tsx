// app/dashboard/page.tsx
import Link from 'next/link';
import { UserCircle, Package, Users, CreditCard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación superior }
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">GymsGG <span className="text-yellow-600">Admin</span></h1>
            </div>
            <div className="flex space-x-8">
              <Link href="#" className="text-gray-900 border-b-2 border-yellow-500 px-1 pt-1 text-sm font-medium">
                Inicio
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                Users
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                Productos
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                Membersías
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Bienvenido Administrador</h2>
        
        {/* Tarjetas de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="#" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <Users className="h-10 w-10 text-yellow-600 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Usuarios</h3>
                <p className="mt-1 text-sm text-gray-500">Gestión de usuarios del sistema</p>
              </div>
            </div>
          </Link>

          <Link href="#" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <Package className="h-10 w-10 text-yellow-600 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Productos</h3>
                <p className="mt-1 text-sm text-gray-500">Administración de productos</p>
              </div>
            </div>
          </Link>

          <Link href="#" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition">
            <div className="px-4 py-5 sm:p-6 flex items-center">
              <CreditCard className="h-10 w-10 text-yellow-600 mr-4" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Membersías</h3>
                <p className="mt-1 text-sm text-gray-500">Control de membresías</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}