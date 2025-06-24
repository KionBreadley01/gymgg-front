import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import './globals.css'

// Componentes
import Footer from './components/Footer'
import SignUp from './signup/page'
import Login from './login/page'



// Metadatos de la aplicación para SEO y la pestaña del navegador.
export const metadata: Metadata = {
  title: 'GymGG',
  description: 'Sistema de gestión de gimnasio',
}

// Layout raíz que envuelve toda la aplicación.
// Define la estructura base del HTML con las fuentes y componentes comunes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      </body>
    </html>
  )
}
