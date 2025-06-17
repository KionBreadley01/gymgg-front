// app/_not-found/page.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="mb-6">Lo sentimos, la página que buscas no existe.</p>
        <Link 
          href="/welcome" 
          className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}