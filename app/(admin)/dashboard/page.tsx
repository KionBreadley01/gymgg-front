// app/dashboard/page.tsx
import { Users, Package, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';





export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-500 pb-2 mb-6 text-center">
          Bienvenido Administrador
        </h2>

        {/* Tarjetas de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              href: '/dashboard/users',
              title: 'Usuarios',
              icon: <Users className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Gestión de usuarios'
            },
            {
              href: '/dashboard/products',
              title: 'Productos',
              icon: <Package className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Administración de productos'
            },
           {
              href: '/memberships',
              title: 'Membresías',
              icon: <CreditCard className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Control de membresías'
            },
              {
              href: '/dashboard/sales',
              title: 'Ventas',
              icon: <ShoppingBag className="h-10 w-10 text-yellow-600 mr-4" />,
              description: 'Control de ventas'
            }
          ].map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-yellow-500 transform hover:-translate-y-1"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                {item.icon}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}