// app/welcome/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function InformativeSection() {
  const plans = [
    {
      name: 'Membresía Básica',
      price: '$499 MXN/mes',
      benefits: [
        'Acceso a área de cardio',
        'Uso de máquinas básicas',
        'Horario matutino (6am-2pm)',
        'Asesoría inicial gratuita'
      ],
    },
    {
      name: 'Membresía Plus',
      price: '$799 MXN/mes',
      benefits: [
        'Acceso a todas las áreas',
        'Uso ilimitado de máquinas',
        'Horario extendido (6am-10pm)',
        'Clases grupales incluidas',
        '1 sesión de entrenador personal'
      ],
    },
    {
      name: 'Membresía Premium',
      price: '$1,199 MXN/mes',
      benefits: [
        'Acceso 24/7',
        'Uso de área VIP',
        'Toalla y locker incluidos',
        'Clases ilimitadas',
        '4 sesiones de entrenador personal',
        'Evaluación física mensual'
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-6xl">
        {/* Encabezado con logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Image 
              src="/Logo.png" 
              alt="Logo GymGG"
              width={120}
              height={120}
              className="rounded-full border-4 border-yellow-500"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-white">
            <span className="text-yellow-500">GymsGG</span> 
          </h1>
        </div>

        {/* Sección informativa con imagen */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-12 border border-yellow-500/30 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent rounded-2xl"></div>
          <div className="relative flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <Image
                  src="/assets/images/image2.png"
                  alt="Sistema de gestión de gimnasios"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-2xl"
                />
              </div>
              
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black text-xl font-bold">⚡</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Sistema Integral de Gestión</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Controla todos los aspectos de tu gimnasio con nuestra plataforma todo-en-uno diseñada para maximizar la eficiencia y el crecimiento de tu negocio.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">👥</span>
                    </div>
                    <span className="text-white font-medium">Gestión de miembros</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">💳</span>
                    </div>
                    <span className="text-white font-medium">Control de pagos</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">📊</span>
                    </div>
                    <span className="text-white font-medium">Asistencia automatizada</span>
                  </div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm">📈</span>
                    </div>
                    <span className="text-white font-medium">Reportes en tiempo real</span>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>

        {/* Sección de Membresías */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Nuestras Membresías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="bg-gray-900 border-2 border-yellow-500 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-yellow-400">{plan.name}</h3>
                  <p className="text-2xl font-bold mb-4 text-white">{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-auto w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Contratar ahora
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de beneficios adicionales */}
        <div className="bg-gray-800 p-6 rounded-xl border border-yellow-500">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Beneficios para todos los miembros</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center">
              <span className="text-yellow-500 mr-2 text-lg">✓</span>
              <span className="text-gray-300">Acceso a eventos exclusivos</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-500 mr-2 text-lg">✓</span>
              <span className="text-gray-300">Descuentos en suplementos</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-yellow-500 mr-2 text-lg">✓</span>
              <span className="text-gray-300">App de seguimiento gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}