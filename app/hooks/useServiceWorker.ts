// app/hooks/useServiceWorker.ts
"use client";

import { useEffect } from 'react';

export function useServiceWorker() {
    useEffect(() => {
        // Solo registramos el Service Worker en modo de producción
        if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        console.log('Intentando registrar Service Worker...');
        
        // La ruta es la raíz, donde está sw.js (en /public)
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
            })
            .catch((error) => {
            console.error('Fallo en el registro del Service Worker:', error);
            });
        }
    }, []);
}