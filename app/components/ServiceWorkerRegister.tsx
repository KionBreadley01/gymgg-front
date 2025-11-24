// app/components/ServiceWorkerRegister.tsx

"use client";

import { useServiceWorker } from '../hooks/useServiceWorker';

// 2. Este componente encapsula la lógica cliente.
export default function ServiceWorkerRegister() {

    // 3. Llama al hook que contiene useEffect.
    useServiceWorker(); 

    // No renderiza nada visual.
    return null; 
}