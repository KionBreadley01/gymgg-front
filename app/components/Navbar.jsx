import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-[96px] bg-gray-800 text-white p-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">GymGG</Link>
        <div className="space-x-4">
          <Link href="/login" className="hover:text-gray-300">Iniciar sesión</Link>
          <Link href="/register" className="hover:text-gray-300">Registrarse</Link>
        </div>
      </div>
    </nav>
  )
}