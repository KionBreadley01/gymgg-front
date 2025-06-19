// app/dashboard/layout.tsx
//para que funcione el Header_admin.tsx en el dashboard y el layout de dashboard quita la s de layouts.tsx
 'use client';

import Header_admin from '../components/Header_admin';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header_admin />
      <main className="min-h-[calc(100vh-160px)] bg-gray-50">
        {children}
      </main>
    </>
  );
}