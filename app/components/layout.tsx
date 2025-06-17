// app/components/Layout.tsx
import Header from './Header';
import Footer from './Footer';
import { ReactNode } from "react";


export const metadata = {
  title: "GymGG",
  description: "Tu gimnasio ideal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen bg-gray-100 text-gray-900">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
