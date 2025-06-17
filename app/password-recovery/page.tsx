// app/password-recovery/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function PasswordRecovery() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="bg-yellow-400 p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-yellow-500">
        {/* Logo centrado arriba del título */}
        <div className="flex justify-center mb-4">
          <Image 
            src="/Logo.png" 
            alt="Logo GymGG" 
            width={80} 
            height={80}
            className="rounded-full border-2 border-black"
          />
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Recuperar Contraseña</h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-gray-800 mb-2 font-medium">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-500 rounded-lg bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-black"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
            >
              Enviar Enlace de Recuperación
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="font-medium text-black hover:text-gray-700 underline"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}