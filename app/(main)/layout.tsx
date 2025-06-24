import Header from '../components/Header';
import { ReactNode } from "react";

// Layout específico para las rutas públicas y de clientes (agrupadas en '/(main)').
// Este layout aplica el `Header` estándar a todas las páginas de esta sección.
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
} 