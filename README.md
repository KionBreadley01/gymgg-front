# GymsGG - Sistema de Gestión de Gimnasio

Este es el repositorio para el frontend de GymsGG, un sistema de gestión de gimnasios construido con Next.js y Tailwind CSS.

## Estructura del Proyecto

La estructura de carpetas está organizada para mantener una clara separación de responsabilidades, siguiendo las convenciones de Next.js.

- **/app**: Contiene el núcleo de la aplicación, utilizando el App Router de Next.js.
  - **/app/(admin)**: Grupo de rutas para el panel de administración. Las URLs de este grupo no incluyen `/(admin)/`.
    - **/app/(admin)/dashboard**: Páginas específicas del panel de administración (gestión de usuarios, productos, etc.).
    - **/app/(admin)/layout.tsx**: Layout que aplica el `Header_admin` a todas las páginas del panel de administración.
  - **/app/(main)**: Grupo de rutas para las páginas públicas y de clientes. Las URLs de este grupo no incluyen `/(main)/`.
    - **/app/(main)/welcome**: Página de bienvenida.
    - **/app/(main)/login**: Página de inicio de sesión.
    - **/app/(main)/memberships**: Página de membresías.
    - **/app/(main)/layout.tsx**: Layout que aplica el `Header` estándar a todas las páginas públicas.
  - **/app/components**: Componentes reutilizables de React (Headers, Footer, etc.).
  - **/app/layout.tsx**: Layout raíz de la aplicación. Aplica fuentes globales y componentes comunes como el `Footer`.
  - **/app/globals.css**: Estilos CSS globales para la aplicación.

- **/public**: Almacena archivos estáticos como imágenes y logos, que son servidos públicamente.
  - **/public/assets/images**: Contiene las imágenes utilizadas en la aplicación.

- **next.config.ts**: Archivo de configuración para Next.js.
- **tailwind.config.ts**: Archivo de configuración para Tailwind CSS.
- **package.json**: Define los scripts del proyecto y gestiona las dependencias.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
