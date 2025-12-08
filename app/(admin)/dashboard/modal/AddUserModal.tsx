"use client";

import apiService from "@/app/Service/apiService";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddUserModal = ({
    show,
    onClose,
    onUserAdded,
}: {
    show: boolean;
    onClose: () => void;
    onUserAdded: () => void;
}) => {
    const [dataEmail, setDataEmail] = useState('');
    const [dataName, setDataName] = useState('');
    const [dataPassword, setDataPassword] = useState('');
    const [dataRole, setDataRole] = useState<'admin' | 'receptionist' | 'user'>('user');

    const resetForm = () => {
        setDataName("");
        setDataEmail("");
        setDataPassword("");
        setDataRole("user");
    };

    const submitForm = async () => {
        if (dataName && dataEmail && dataPassword) {
            const form = {
                name: dataName,
                email: dataEmail,
                password: dataPassword,
                role: dataRole,
            };
            
            const response = await apiService.post("/useraccount/create", form);

            if (response && response.id) {
                resetForm();
                toast.success("Usuario agregado correctamente");
                onUserAdded();
                onClose();
            } else {
                toast.error("Ocurrió un error");
                console.log("Error en respuesta:", response);
            }
        } else {
            toast.error("Por favor complete todos los campos obligatorios");
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Registrar Nuevo Usuario</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    submitForm(); 
                }} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de Usuario <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={dataName}
                            onChange={(e) => setDataName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder="Nombre del Usuario"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo de Usuario <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={dataEmail}
                            onChange={(e) => setDataEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña de Usuario <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={dataPassword}
                            onChange={(e) => setDataPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            placeholder="Contraseña del usuario"
                            required
                        />
                    </div>

                    {/* Selector de Rol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rol de Usuario <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={dataRole}
                            onChange={(e) => setDataRole(e.target.value as 'admin' | 'receptionist' | 'user')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            required
                        >
                            <option value="user">Usuario</option>
                            <option value="receptionist">Recepcionista</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <p className="mt-2 text-xs text-gray-500">
                            {dataRole === 'admin' && 'Tendrá acceso completo al sistema'}
                            {dataRole === 'receptionist' && 'Podrá gestionar usuarios sin permisos de superusuario'}
                            {dataRole === 'user' && 'Acceso básico como usuario regular'}
                        </p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                            Agregar Usuario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;