"use client";

import apiService from "@/app/Service/apiService";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddUserModal = ({
    show,
    onClose,
    onUserAdded, // ← aquí la estás recibiendo como prop
}: {
    show: boolean;
    onClose: () => void;
    onUserAdded: () => void; // ← asegúrate de declararla aquí también
}) => {
    const [dataEmail, setDataEmail] = useState('');
    const [dataName, setDataName] = useState('');
    const [dataMembership, setDataMembership] = useState('');
    const [dataDatePay, setDataDatePay] = useState('');
    const [dataPassword, setDataPassword] = useState('');
    const [Membership, setMembership] = useState<
        {id:string; name_membership:string; duration_membership:string}[]
    >([]);

    useEffect(() => {
                       const token = localStorage.getItem('access');

        fetch("http://localhost:8000/membership",{

              method: "GET",
           headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }) // si hay token, se agrega
      }
      }) // ajusta la URL según tu backend
            .then((res) => res.json())
            .then((data) => setMembership(data))
            .catch((err) => console.error("Error cargando categorías", err));
    }, []);

    const resetForm = () => {
        setDataName("");
        setDataEmail("");
        setDataMembership("");
        setDataDatePay("");
        setDataPassword("");
    };

    const submitForm = async () => {
        if (
            dataName &&
            dataEmail &&
            dataMembership &&
            dataDatePay &&
            dataPassword
        
        ) {
            const form = {
                name: dataName,
                email: dataEmail,
                membership_id: dataMembership,
                date_pay: dataDatePay,
                password: dataPassword,
            };
            const response = await apiService.post("/useraccount/create", form);

            if (response && response.id) {
                resetForm();
                toast.success("Usuario agregado correctamente");
                onUserAdded();
                onClose(); // Cerrar modal
            } else {
                toast.error("Ocurrio un error correctamente");
                console.log("llego aqui?", response);
                onUserAdded();
            }
        } else{
            toast.error("Ocurrio un error correctamente");

        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4  bg-black/60">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Registrar Nuevo Usuario</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Usuario</label>
                        <input
                            type="text"
                     
                            value={dataName}
                            onChange={(e) => setDataName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nombre del Usuario"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Correo de Usuario</label>
                        <input
                            type="email"
                            name="name"
                            value={dataEmail}
                            onChange={(e) => setDataEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Correo de Usuario"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de Usuario</label>
                        <input
                            type="password"
                            name="name"
                            value={dataPassword}
                            onChange={(e) => setDataPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Contraseña del usuario"
                            required
                        />-
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Membresia</label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={dataMembership}
                            onChange={(e) => setDataMembership(e.target.value)}
                            >
                            <option value="">Selecciona</option>
                            {Membership.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                {cat.name_membership} - {cat.duration_membership} Meses
                                </option>
                            ))}
                        </select>
                        {/* <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            value={dataMembership}
                            onChange={(e) => setDataMembership(e.target.value)}
                        >
                            <option value="">Selecciona</option>
                            {Membership.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name_membership} - {cat.membership_duration} Meses</option>
                            ))}
                        </select> */}
                    </div>

                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Pago</label>
                            <input
                                type="date"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="00.00"
                                value={dataDatePay}
                                onChange={(e) => {
                                    setDataDatePay(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        >
                            Agregar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
