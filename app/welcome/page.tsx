// app/welcome/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function InformativeSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-500 to-yellow-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        {/* Encabezado con logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Image 
              src="/assets/images/image1.png" 
              alt="Logo GymGG"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-800">
            <span className="text-yellow-600">GymsGG</span> Admin
          </h1>
        </div>

        {/* Sección informativa con imagen */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="md:w-1/2">
            <Image
              src="/assets/images/image2.png"
              alt="Sistema de gestión de gimnasios"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sistema Integral de Gestión</h2>
            <p className="text-gray-600 mb-4">
              Controla todos los aspectos de tu gimnasio con nuestra plataforma todo-en-uno.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">✓</span> Gestión de miembros
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">✓</span> Control de pagos
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">✓</span> Asistencia automatizada
              </li>
              <li className="flex items-center">
                <span className="text-yellow-500 mr-2">✓</span> Reportes en tiempo real
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}