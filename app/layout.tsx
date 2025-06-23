import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import './globals.css'

// Componentes
import Footer from './components/Footer'

// Carga de fuentes personalizadas desde Google Fonts.
// Estas fuentes se aplicarán globalmente a la aplicación.
const oswald = Oswald({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-oswald',
})

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
})

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
      <body className={`${oswald.variable} ${roboto.variable}`}>
        {/* 'children' representa el contenido de la página activa. */}
        {children}
        <Footer />
      </body>
    </html>
  )
}