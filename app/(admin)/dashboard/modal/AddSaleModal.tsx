"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import apiService from "@/app/Service/apiService";

interface Product {
    id: string;
    name_product: string;
    price_product: number;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface SaleItem {
    product_id: string;
    quantity: number;
    unit_price: string; // precio como string con 2 decimales
}

interface SaleData {
    user: string;
    total_price: number;
    items: SaleItem[];
}


const AddSaleModal = ({
    show,
    onClose,
    onSaleAdded,
}: {
    show: boolean;
    onClose: () => void;
    onSaleAdded: () => void;
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [saleproduct, setSaleproduct] = useState<
        { product: string; quantity: number }[]
    >([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    // Cargar productos al abrir el modal
    // Datos de productos
    const token = localStorage.getItem('access');

    useEffect(() => {
        fetch('http://localhost:8000/products/',{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }) // si hay token, se agrega
      }
    }) 
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error cargando categorías', err));
    }, []);

    // Datos
    useEffect(() => {
        fetch('http://localhost:8000/useraccount/',{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }) // si hay token, se agrega
      }
    }) 
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Error cargando categorías', err));
    }, []);

    const addProductToSale = () => {
        if (selectedProductId && quantity > 0) {
            const product = products.find(p => p.id === selectedProductId);
            if (!product) return;
            setSaleproduct((prev) => [
                ...prev,
                { product: selectedProductId, quantity },
            ]);
            setSelectedProductId("");
            setQuantity(1);
        }
    };

    const removeItem = (index: number) => {
        setSaleproduct((prev) => prev.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return saleproduct
            .reduce((acc, item) => {
                const prod = products.find((p) => p.id === item.product);
                return acc + (prod ? prod.price_product * item.quantity : 0);
            }, 0)
            .toFixed(2);
    };

    const submitSale = async () => {
        if (saleproduct.length === 0 || !selectedUserId) {
            alert("Selecciona un usuario y al menos un producto");
            return;
        }

        // Calcular total dentro de la función
        const total = parseFloat(calculateTotal());

        const data = {
            user: selectedUserId,
            total_price: total,
            items: saleproduct.map(item => {
                const productData = products.find(p => p.id === item.product);
                return {
                    product_id: item.product,
                    quantity: item.quantity,
                    unit_price: productData ? Number(productData.price_product) : 0,
                };
            }),
        };

        console.log("Enviando venta al backend:", data);
      const response = await apiService.post('/Sales/create', data);
              if (response && response.id) {
        console.log('venta realizada correctamente');
      setSaleproduct([]);
        setSelectedUserId("");
        onClose(); // Cerrar modal
      } else {
      
        console.log('llego aqui?',response);
      }

    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center product-center z-50 bg-black/60 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
                <div className="flex justify-between product-center p-6 border-b">
                    <h3 className="text-lg font-bold">Registrar Nueva Venta</h3>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recepcionista</label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Selecciona</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name} - {u.email}
                            </option>
                        ))}
                    </select>

                    <div className="flex space-x-4">
                        <select
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            className="flex-1 border px-3 py-2 rounded-lg"
                        >
                            <option value="">Selecciona producto</option>
                            {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name_product} - ${p.price_product}
                                </option>
                                
                            ))}
                        </select>
                        

                        <input
                            type="number"
                            min={1}
                            className="w-24 border px-3 py-2 rounded-lg"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                        <button
                            onClick={addProductToSale}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Agregar
                        </button>
                    </div>

                    {/* Lista de productos agregados */}
                    <div>
                        {saleproduct.length === 0 ? (
                            <p className="text-gray-500">No hay productos agregados</p>
                        ) : (
                            <ul className="space-y-2">
                                {saleproduct.map((item, index) => {
                                    const prod = products.find((p) => p.id === item.product);
                                    return (
                                        <li
                                            key={index}
                                            className="flex justify-between product-center border p-2 rounded"
                                        >
                                            <span>
                                                {prod?.name_product} x {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                    {/* Total y botones */}
                    <div className="flex justify-between product-center pt-4 border-t">
                        <span className="font-bold text-lg">
                            Total: ${calculateTotal()}
                        </span>
                        <button
                            onClick={submitSale}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg"
                        >
                            Registrar Venta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSaleModal;
