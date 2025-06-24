// app/pages/memberships/page.tsx
export default function Memberships() {
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
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Membresías Disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-900 border border-yellow-500 rounded-2xl shadow-lg p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">{plan.name}</h2>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-auto w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-xl transition">
                Contratar ahora
              </button>
            </div>
          ))}
        </div>

        {/* Sección adicional */}
        <div className="mt-16 bg-gray-800 p-8 rounded-2xl border border-yellow-500">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Beneficios para todos los miembros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span>
              <span>Acceso a eventos exclusivos</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span>
              <span>Descuentos en suplementos</span>
            </div>
            <div className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span>
              <span>App de seguimiento gratuita</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}