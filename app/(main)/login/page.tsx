'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import apiService from '@/app/Service/apiService';
import { toast } from 'react-toastify';
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const respuesta = await apiService.post("/useraccount/login/", { email, password }); 

      if (respuesta.access && respuesta.refresh) {
        localStorage.setItem("access", respuesta.access);
        localStorage.setItem("refresh", respuesta.refresh);
        localStorage.setItem("user", JSON.stringify("usuario")); 
        console.log(respuesta)
        toast.success("Bienvenido " + email);

        if (respuesta.is_superuser && respuesta.is_staff) {
          console.log("entro aqui admin (Superuser)");
          router.push('/dashboard');
        } else if (respuesta.is_staff) {
          console.log("entro aqui admin (Staff regular)");
          router.push('/dashboard2');
        } else {
             router.push('/dashboard'); 
        }
      } else {
        toast.dismiss()
        toast.error("Error de credenciales");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error de credenciales o de conexión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden p-4">
      <div className="absolute inset-0 z-0">
        
        <Image
          src="/assets/images/gym.jpg" 
          alt="Fondo de gimnasio"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="blur-sm scale-110" 
        />
        <div className="absolute inset-0 bg-black/60" /> 
      </div>
      
      
      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-yellow-400 transform transition-all duration-300 hover:shadow-yellow-400/30">
        
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/Logo.png" 
            alt="Logo GymGG" 
            width={120} 
            height={100}
            className="rounded-full border-4 border-yellow-400 shadow-xl mb-3"
          />
          <h1 className="text-4xl font-extrabold text-white mt-2 tracking-tighter">
            Inicio de sesión
          </h1>
          <p className="text-yellow-400 font-semibold text-lg">Entrena con el máximo poder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Campo de Email/Usuario */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
                Correo Electrónico
            </label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="email" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-700/70 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition shadow-inner"
                    placeholder="ejemplo@gymgg.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña
            </label>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="password"
                    // CAMBIO 3: Inputs ligeramente transparentes para un look unificado
                    className="w-full pl-10 pr-4 py-3 border border-gray-700/70 rounded-lg bg-gray-800/70 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition shadow-inner"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
          </div>

          {/* Enlace de recuperación de contraseña */}
          <div className="flex justify-end text-sm">
            <Link href="/password-recovery" 
                className="font-medium text-yellow-400 hover:text-yellow-500 transition duration-150 ease-in-out">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de Inicio de Sesión */}
          <div>
            <button
              type="submit"
              // Botón Amarillo/Negro de alto contraste
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-xl text-base font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition duration-150 ease-in-out transform hover:scale-[1.01]"
            >
              Acceder a mi cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}