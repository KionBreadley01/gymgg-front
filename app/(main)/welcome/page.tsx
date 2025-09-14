'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function InformativeSection() {
  type Membership = {
    id: number,
    name_membership: string,
    price_membership: number,
    offers_membership: number,
    membership_duration: number
  }

  const [membership, setMembership] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/membership/")
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error al obtener los datos ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMembership(data);
      })
      .catch((error) => console.log("Error: ", error))
      .finally(() => setLoading(false));
  }, []);

  const plans = membership.map((m) => ({
    name: m.name_membership,
    price: `$${m.price_membership}`,
    benefits: [
      'Acceso ilimitado a todas las áreas',
      'Soporte premium',
      'Clases grupales incluidas',
      'Entrenador personal',
      'Descuentos en productos'
    ]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-gray-100 to-yellow-300 flex flex-col items-center py-10">
      <div className="w-full max-w-7xl px-4">

        {/* Hero profesional */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-16 py-14">
          <div className="md:w-1/2 flex flex-col gap-8">
            <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">GYMSGG</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gestión profesional para tu gimnasio</h2>
            <p className="text-lg text-gray-600 mb-6">
              Lleva tu gimnasio al siguiente nivel con nuestra plataforma integral. Controla membresías, pagos y asistencia con una experiencia moderna y eficiente.
            </p>
            <Link href="/register" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200">
              Comienza ahora
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <Image
                src="/assets/images/image2.png"
                alt="Sistema de gestión de gimnasios"
                width={520}
                height={420}
                className="rounded-3xl shadow-2xl border-4 border-yellow-400 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">🏋️</span>
              </div>
            </div>
          </div>
        </section>

        {/* Características profesionales */}
        <section className="my-20">
          <h3 className="text-3xl font-bold text-center text-yellow-500 mb-12">Ventajas de nuestra plataforma</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-yellow-100 hover:shadow-2xl transition">
              <span className="text-4xl mb-3 text-yellow-400">👥</span>
              <span className="font-semibold text-gray-700 mb-2">Gestión avanzada de miembros</span>
              <span className="text-gray-500 text-center text-sm">Organiza y administra los datos de tus clientes con facilidad y seguridad.</span>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-yellow-100 hover:shadow-2xl transition">
              <span className="text-4xl mb-3 text-yellow-400">💳</span>
              <span className="font-semibold text-gray-700 mb-2">Pagos automatizados</span>
              <span className="text-gray-500 text-center text-sm">Gestiona cobros y vencimientos de manera eficiente y sin errores.</span>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-yellow-100 hover:shadow-2xl transition">
              <span className="text-4xl mb-3 text-yellow-400">📊</span>
              <span className="font-semibold text-gray-700 mb-2">Asistencia digital</span>
              <span className="text-gray-500 text-center text-sm">Control de asistencia automatizado para mayor comodidad y control.</span>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-yellow-100 hover:shadow-2xl transition">
              <span className="text-4xl mb-3 text-yellow-400">📈</span>
              <span className="font-semibold text-gray-700 mb-2">Reportes inteligentes</span>
              <span className="text-gray-500 text-center text-sm">Visualiza estadísticas y reportes en tiempo real para tomar mejores decisiones.</span>
            </div>
          </div>
        </section>

        {/* Membresías */}
        <section className="my-20">
          <h2 className="text-4xl font-extrabold text-center text-yellow-500 mb-12">Nuestras Membresías</h2>
          {loading ? (
            <div className="text-center text-gray-400 py-12 text-lg animate-pulse">
              Cargando planes...
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center text-gray-700 mb-8 py-12 text-lg">
              No hay membresías disponibles en este momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-yellow-400 rounded-2xl shadow-xl p-8 flex flex-col justify-between hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-yellow-500">{plan.name}</h3>
                    <p className="text-3xl font-extrabold mb-4 text-gray-900">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md">
                    Contratar ahora
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Beneficios adicionales */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-yellow-500 mb-8 text-center">Beneficios para todos los miembros</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center text-lg font-medium bg-white rounded-xl shadow p-6 border border-yellow-100">
              <span className="text-yellow-400 mr-3 text-2xl">✓</span>
              <span className="text-gray-700">Acceso a eventos exclusivos</span>
            </div>
            <div className="flex items-center justify-center text-lg font-medium bg-white rounded-xl shadow p-6 border border-yellow-100">
              <span className="text-yellow-400 mr-3 text-2xl">✓</span>
              <span className="text-gray-700">Descuentos en suplementos</span>
            </div>
            <div className="flex items-center justify-center text-lg font-medium bg-white rounded-xl shadow p-6 border border-yellow-100">
              <span className="text-yellow-400 mr-3 text-2xl">✓</span>
              <span className="text-gray-700">App de seguimiento gratuita</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}