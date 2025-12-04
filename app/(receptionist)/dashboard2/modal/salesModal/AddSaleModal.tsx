"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Search, ShoppingCart, Trash2, Plus, AlertCircle } from "lucide-react";
import apiService from "@/app/Service/apiService";
import { toast } from 'react-toastify';

interface Product {
    id: string;
    name_product: string;
    price_product: number;
    stock: number;
    category: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface SaleItem {
    product_id: string;
    quantity: number;
    unit_price: string;
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
    const [users, setUsers] = useState<User[]>([]);

    // Form states
    const [selectedUserId, setSelectedUserId] = useState("");
    const [userSearch, setUserSearch] = useState("");

    // Product selection states
    const [productSearch, setProductSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Cart state
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load initial data
    useEffect(() => {
        if (show) {
            const token = localStorage.getItem('access');
            const headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` })
            };

            // Fetch Products
            fetch('http://localhost:8000/products/', { method: "GET", headers })
                .then(res => res.json())
                .then(data => setProducts(data))
                .catch(err => console.error('Error loading products', err));

            // Fetch Users
            fetch('http://localhost:8000/useraccount/', { method: "GET", headers })
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(err => console.error('Error loading users', err));
        }
    }, [show]);

    // Reset form when closed
    useEffect(() => {
        if (!show) {
            setCart([]);
            setSelectedUserId("");
            setSelectedProduct(null);
            setProductSearch("");
            setUserSearch("");
            setQuantity(1);
        }
    }, [show]);

    // Filtered lists
    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name_product.toLowerCase().includes(productSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(productSearch.toLowerCase())
        );
    }, [products, productSearch]);

    const filteredUsers = useMemo(() => {
        return users.filter(u =>
            u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(userSearch.toLowerCase())
        );
    }, [users, userSearch]);

    const addToCart = () => {
        if (!selectedProduct) return;

        if (quantity <= 0) {
            toast.warning("La cantidad debe ser mayor a 0");
            return;
        }

        if (quantity > selectedProduct.stock) {
            toast.error(`Stock insuficiente. Solo hay ${selectedProduct.stock} disponibles.`);
            return;
        }

        // Check if product is already in cart
        const existingItemIndex = cart.findIndex(item => item.product.id === selectedProduct.id);

        if (existingItemIndex >= 0) {
            const newCart = [...cart];
            const newQuantity = newCart[existingItemIndex].quantity + quantity;

            if (newQuantity > selectedProduct.stock) {
                toast.error(`No puedes agregar más de ${selectedProduct.stock} unidades en total.`);
                return;
            }

            newCart[existingItemIndex].quantity = newQuantity;
            setCart(newCart);
        } else {
            setCart([...cart, { product: selectedProduct, quantity }]);
        }

        // Reset selection
        setSelectedProduct(null);
        setProductSearch("");
        setQuantity(1);
    };

    const removeFromCart = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.product.price_product * item.quantity), 0).toFixed(2);
    };

    const submitSale = async () => {
        if (cart.length === 0) {
            toast.error("Agrega al menos un producto al carrito");
            return;
        }
        if (!selectedUserId) {
            toast.error("Selecciona un usuario (vendedor/recepcionista)");
            return;
        }

        setIsSubmitting(true);

        const data = {
            user_id: selectedUserId,
            total_price: parseFloat(calculateTotal()),
            items: cart.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                unit_price: item.product.price_product,
            })),
        };

        try {
            const response = await apiService.post('/Sales/create', data);
            if (response && response.id) {
                toast.success('Venta registrada exitosamente');
                onSaleAdded();
                onClose();
            } else {
                toast.error('Error al registrar la venta');
                console.error(response);
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error inesperado');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 p-4 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <ShoppingCart className="w-6 h-6 text-yellow-600" />
                            Nueva Venta
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Registra una nueva venta de productos</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                    {/* Left Panel: Selection */}
                    <div className="flex-1 p-6 overflow-y-auto border-r border-gray-100">
                        <div className="space-y-6">
                            {/* User Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Vendedor / Recepcionista</label>
                                <div className="relative">
                                    <select
                                        value={selectedUserId}
                                        onChange={(e) => setSelectedUserId(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all bg-white text-gray-900 appearance-none"
                                    >
                                        <option value="">Seleccionar usuario...</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>
                                                {u.name} ({u.email})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <Search className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 my-4"></div>

                            {/* Product Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Producto</label>
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o categoría..."
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-gray-900"
                                        value={productSearch}
                                        onChange={(e) => setProductSearch(e.target.value)}
                                    />
                                </div>

                                {/* Product List */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto bg-gray-50/30">
                                    {filteredProducts.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            No se encontraron productos
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {filteredProducts.map(product => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => setSelectedProduct(product)}
                                                    className={`p-3 cursor-pointer hover:bg-yellow-50 transition-colors flex justify-between items-center ${selectedProduct?.id === product.id ? 'bg-yellow-50 border-l-4 border-yellow-500' : ''}`}
                                                >
                                                    <div>
                                                        <p className="font-medium text-gray-900">{product.name_product}</p>
                                                        <p className="text-xs text-gray-500">{product.category} • Stock: <span className={product.stock < 5 ? "text-red-500 font-bold" : "text-green-600"}>{product.stock}</span></p>
                                                    </div>
                                                    <p className="font-bold text-gray-900">${product.price_product}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Add to Cart Controls */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-end gap-4">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Producto Seleccionado</label>
                                        <div className="font-medium text-gray-900 truncate h-6">
                                            {selectedProduct ? selectedProduct.name_product : <span className="text-gray-400 italic">Ninguno</span>}
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Cantidad</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max={selectedProduct?.stock || 1}
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                            disabled={!selectedProduct}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 text-gray-900 disabled:bg-gray-100"
                                        />
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        disabled={!selectedProduct || quantity < 1}
                                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Agregar
                                    </button>
                                </div>
                                {selectedProduct && (
                                    <div className="mt-2 text-xs flex items-center gap-1 text-blue-600">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Stock disponible: {selectedProduct.stock}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Cart Summary */}
                    <div className="w-full lg:w-1/3 bg-gray-50/50 flex flex-col border-l border-gray-100">
                        <div className="p-4 bg-white border-b border-gray-100">
                            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Resumen de Venta
                            </h4>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                                    <ShoppingCart className="w-12 h-12 opacity-20" />
                                    <p className="text-sm">El carrito está vacío</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map((item, index) => (
                                        <div key={index} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{item.product.name_product}</p>
                                                <p className="text-xs text-gray-500">
                                                    {item.quantity} x ${item.product.price_product}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-gray-900">
                                                    ${(item.quantity * item.product.price_product).toFixed(2)}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-gray-500 text-sm">Total a Pagar</span>
                                <span className="text-3xl font-bold text-gray-900">${calculateTotal()}</span>
                            </div>
                            <button
                                onClick={submitSale}
                                disabled={isSubmitting || cart.length === 0}
                                className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-green-600/20 font-medium text-lg flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? 'Procesando...' : 'Confirmar Venta'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSaleModal;
