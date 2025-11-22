import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next'
import { Oswald, Roboto } from 'next/font/google'
import './globals.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
// import SignUp from './signup/page'
import Login from './(main)/login/page'

import ServiceWorkerRegister from './components/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: 'GymGG',
  description: 'Sistema de gestión de gimnasio',
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
          {/* <Header /> */}
          <ServiceWorkerRegister />
          {children}
          <ToastContainer/>
          <Footer />
          {/* <Login /> */}
          {/* <SignUp />  */}
      </body>
      
    </html>
  )
}
