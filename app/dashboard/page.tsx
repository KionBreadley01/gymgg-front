// app/dashboard/page.tsx
import Link from 'next/link';
import { Users, Package, CreditCard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-500 pb-2 mb-6">
          Bienvenido Administrador
        </h2>

        {/* Tarjetas de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: '#',
              title: 'Usuarios',
              icon: <Users className="h-10 w-10 text-yellow-600 mr-4 border-gray-600" />,
              description: 'Gestión de usuarios del sistema',
            },
            {
              href: '#',
              title: 'Productos',
              icon: <Package className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Administración de productos',
            },
            {
              href: '#',
              title: 'Membersías',
              icon: <CreditCard className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Control de membresías',
            },
            {
              href: '#',
              title: 'Ventas',
              icon: <CreditCard className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Control de Ventas',
            },
          ].map(({ href, title, icon, description }) => (
            <Link
              href={href}
              key={title}
              className="bg-white overflow-hidden rounded-xl shadow-md hover:shadow-xl transition w-full max-w-md border-t-4 border-transparent hover:bg-yellow-400"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                {icon}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}