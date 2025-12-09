'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CheckCircle, Zap, Package, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function InformativeSection() {
    // TIPOS DE DATOS
    type Membership = {
        id: number,
        name_membership: string,
        price_membership: number,
        offers_membership: string[],
        duration_membership: string
    }

    const [membership, setMembership] = useState<Membership[]>([]);
    const [loading, setLoading] = useState(true);

    type Product = {
        id: number,
        name_product: string,
        price_product: number,
        description?: string,
        image_url?: string | null
    }
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // FETCH LOGIC
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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/products/")
            .then(async (response) => {
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Error al obtener los datos ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.log("Error: ", error))
            .finally(() => setLoadingProducts(false));
    }, []);

    const plans = membership.map((m) => ({
        name: m.name_membership,
        price: `$${m.price_membership}`,
        benefits: Array.isArray(m.offers_membership) ? m.offers_membership : [
            'Acceso ilimitado a todas las áreas',
            'Soporte premium',
            'Clases grupales incluidas'
        ]
    }));

    return (
        <div className="min-h-screen bg-black flex flex-col items-center">
            <div className="w-full max-w-7xl">

                {/* --- HERO ESTILO IMAGEN REFERENCIA --- */}
                <section className="relative min-h-screen flex items-center">
                    {/* Imagen de fondo */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/assets/images/image2.png"
                            alt="Gym Background"
                            fill
                            className="object-cover opacity-40"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    </div>

                    {/* Contenido principal */}
                    <div className="relative z-10 w-full px-8 lg:px-16 py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            
                            {/* Columna izquierda - Texto principal */}
                            <div className="space-y-8">
                                {/* Título gigante */}
                                <div className="space-y-4">
                                    <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-none tracking-tighter">
                                        GymsGG
                                    </h1>
                                    <h5 className="text-7xl lg:text-2xl xl:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent leading-none tracking-tighter">
                                        ¡Entrena ahora!
                                    </h5>
                                </div>

                                {/* Botón amarillo prominente */}
                                <div className="flex items-center gap-6">
                                     <Link href="/login" className="group flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-5 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                                        <span>Comienza ya</span>
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link> 
                                </div>

                                {/* Texto descriptivo */}
                                <div className="max-w-md space-y-6 pt-8">
                                    <h2 className="text-3xl font-bold text-white leading-tight">
                                        Empoderando a todos para moverse con más fuerza, vivir mejor y llegar más lejos. 
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Aquí forjamos algo más que músculos: Desarrollamos la disciplina inquebrantable, la confianza que te impulsa y el estilo de vida del que, finalmente, te sentirás imparablemente orgulloso.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sección inferior - About Our Gym */}
                        <div className="mt-32 max-w-2xl">
                            <h3 className="text-sm font-bold text-yellow-400 mb-4 tracking-wider">SOBRE NUESTRO GIMNASIO</h3>
                            <p className="text-gray-400 text-base leading-relaxed">
                                Fundados con la visión de crear un entorno de apoyo y empoderamiento, hemos crecido hasta convertirnos en una comunidad que celebra cada logro, por pequeño que sea. Nuestro gimnasio es más que solo equipo y espacio: es un lugar donde ocurren transformaciones reales.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Separador */}
                <div className="h-px bg-gray-800 mx-8"></div>

                {/* --- CARACTERÍSTICAS PROFESIONALES --- */}
                <section className="px-8 lg:px-16 py-24">
                    <h3 className="text-5xl font-extrabold text-white mb-20 text-center">Potencia tu Gestión</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-800 hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300">
                            <Package className="w-12 h-12 text-yellow-400 mb-4"/>
                            <span className="font-bold text-white mb-2 text-lg text-center">Gestión avanzada de miembros</span>
                            <span className="text-gray-400 text-center text-sm">Organiza y administra los datos de tus clientes con facilidad y seguridad.</span>
                        </div>
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-800 hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300">
                            <DollarSign className="w-12 h-12 text-yellow-400 mb-4"/>
                            <span className="font-bold text-white mb-2 text-lg text-center">Pagos automatizados</span>
                            <span className="text-gray-400 text-center text-sm">Gestiona cobros y vencimientos de manera eficiente y sin errores.</span>
                        </div>
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-800 hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300">
                            <Calendar className="w-12 h-12 text-yellow-400 mb-4"/>
                            <span className="font-bold text-white mb-2 text-lg text-center">Asistencia digital</span>
                            <span className="text-gray-400 text-center text-sm">Control de asistencia automatizado para mayor comodidad y control.</span>
                        </div>
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-800 hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300">
                            <TrendingUp className="w-12 h-12 text-yellow-400 mb-4"/>
                            <span className="font-bold text-white mb-2 text-lg text-center">Reportes inteligentes</span>
                            <span className="text-gray-400 text-center text-sm">Visualiza estadísticas y reportes en tiempo real para tomar mejores decisiones.</span>
                        </div>
                    </div>
                </section>
                
                <div className="h-px bg-gray-800 mx-8"></div>

                {/* --- CATÁLOGO DE PRODUCTOS --- */}
                <section className="px-8 lg:px-16 py-24">
                    <h2 className="text-5xl font-extrabold text-white mb-20 text-center">Catálogo de <span className="text-yellow-400">Productos</span></h2>
                    {loadingProducts ? (
                        <div className="text-center text-gray-500 py-12 text-lg animate-pulse">Cargando productos...</div>
                    ) : products.length === 0 ? (
                        <div className="text-center text-gray-400 mb-8 py-12 text-lg">No hay productos disponibles por el momento.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {products.slice(0, 6).map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-xl flex flex-col justify-between hover:scale-[1.03] hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={() => setSelectedProduct(p)}
                                >
                                    <div className="w-full h-56 bg-gray-800 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={p.image_url || "/assets/images/products/creatine.jpeg"}
                                            alt={p.name_product}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://via.placeholder.com/150?text=${p.name_product.charAt(0)}`;
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 text-white">{p.name_product}</h3>
                                        <p className="text-3xl font-extrabold text-yellow-400 mb-3">${p.price_product}</p>
                                        <span className="text-sm text-gray-500 italic">Ver detalles...</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* --- MODAL DE PRODUCTO --- */}
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
                        <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden relative border border-yellow-400/50" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors z-10 shadow-lg text-black"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 h-64 md:h-auto bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src={selectedProduct.image_url || "/assets/images/products/creatine.jpeg"}
                                        alt={selectedProduct.name_product}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://via.placeholder.com/300?text=${selectedProduct.name_product.charAt(0)}`;
                                        }}
                                    />
                                </div>
                                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                                    <h3 className="text-4xl font-extrabold text-white mb-2">{selectedProduct.name_product}</h3>
                                    <p className="text-5xl font-extrabold text-yellow-400 mb-6">${selectedProduct.price_product}</p>

                                    <div className="text-gray-300 mb-8 space-y-4">
                                        <h4 className="text-xl font-bold text-yellow-400 mb-2 border-b border-gray-800 pb-1">Descripción</h4>
                                        <p className="text-gray-400">{selectedProduct.description || "Sin descripción disponible."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="h-px bg-gray-800 mx-8"></div>

                {/* --- MEMBRESÍAS --- */}
                <section className="px-8 lg:px-16 py-24">
                    <h2 className="text-5xl font-extrabold text-white mb-20 text-center">Plan de <span className="text-yellow-400">Membresías</span></h2>
                    {loading ? (
                        <div className="text-center text-gray-500 py-12 text-lg animate-pulse">Cargando planes...</div>
                    ) : plans.length === 0 ? (
                        <div className="text-center text-gray-400 mb-8 py-12 text-lg">No hay membresías disponibles en este momento.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {plans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col justify-between border border-gray-800 hover:border-yellow-400/50 hover:shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-2 
                                    ${index === 1 ? 'border-yellow-400/50 ring-2 ring-yellow-400/30' : ''}`}
                                >
                                    <div>
                                        <h3 className={`text-3xl font-extrabold mb-3 ${index === 1 ? 'text-yellow-400' : 'text-white'}`}>{plan.name}</h3>
                                        <p className="text-4xl font-extrabold mb-6 text-yellow-400">{plan.price}</p>
                                        <ul className="space-y-3 mb-8">
                                            {plan.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start text-gray-300">
                                                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                                                    <span className="text-base">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-[1.02]">
                                        Contratar ahora
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                
                <div className="h-px bg-gray-800 mx-8"></div>

                {/* --- BENEFICIOS ADICIONALES --- */}
                <section className="px-8 lg:px-16 py-24">
                    <h3 className="text-4xl font-bold text-yellow-400 mb-16 text-center">Beneficios para todos los miembros</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center text-lg font-medium bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-800 hover:border-yellow-400/50 transition-all">
                            <Zap className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">Acceso a eventos exclusivos</span>
                        </div>
                        <div className="flex items-center text-lg font-medium bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-800 hover:border-yellow-400/50 transition-all">
                            <Zap className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">Descuentos en suplementos</span>
                        </div>
                        <div className="flex items-center text-lg font-medium bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-800 hover:border-yellow-400/50 transition-all">
                            <Zap className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                            <span className="text-gray-300">App de seguimiento gratuita</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}