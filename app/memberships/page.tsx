// app/pages/memberships/page.tsx
export default function Memberships() {
  const plans = [
    {
      name: 'Gratis',
      price: '$0',
      benefits: ['Acceso limitado', 'Soporte por correo', 'Contenido básico'],
 
    },
    {
      name: 'Básica',
      price: '$99 MXN/mes',
      benefits: ['Acceso completo', 'Soporte prioritario', 'Certificados digitales'],
     
    },
    {
      name: 'Premium',
      price: '$199 MXN/mes',
      benefits: ['Todo lo de Básica', 'Exámenes ilimitados', 'Acceso anticipado a contenido nuevo'],
    
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Planes de Membresía</h1>
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
             
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
