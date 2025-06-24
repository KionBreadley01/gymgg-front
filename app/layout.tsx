import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import './globals.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import SignUp from './signup/page'
import Login from './login/page'


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
      <body>
          <Header />
          {children}
          <Footer />
          {/* <Login />
          <SignUp /> */}
      </body>
    </html>
  )
}
