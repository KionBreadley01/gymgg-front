import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import './globals.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

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

export const metadata: Metadata = {
  title: 'GymGG',
  description: 'Sistema de gestión de gimnasio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${oswald.variable} ${roboto.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}