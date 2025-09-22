'use client';

import apiService from "@/app/Service/apiService";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface DeleteSaleProp {
    show: boolean;
    onClose:()=> void;
    onSaleAdded: any;
    saleget: any
}
export default  function DeleteSaleModal ({show, onClose, onSaleAdded, saleget}: DeleteSaleProp){

    const [dataid, setDataid] = useState('');

    useEffect(() => {
        if (saleget && show) {
            setDataid(saleget.id || '')
        }
    }, [saleget, show]);

    const confirm = async () => {
        const response = await apiService.delete(`/Sales/delete/${dataid}`)
        console.log(response)

        if(response.success){
            toast.success('Rembolso realizado');
            onSaleAdded();
            onClose(); 
        }else {
            toast.error('Error al realizar el rembolso');
            console.log(response)
        }  
    }

    if (!show || !saleget) return null;
    const cnt= parseFloat(saleget.stock)
    const precio=parseFloat(saleget.price)
    const tot= cnt*precio

    console.log(saleget)

    return(
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Realizar Rembolso</h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                        <X className="h-5 w-5" />
                        </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <Trash2 className="h-6 w-6 text-red-600" /> 
                        </div>
                        <div>
                            <h4 className="text-lg font-medium text-gray-900">¿Estás seguro de realizar rembolso?</h4>
                            <p className="text-gray-500">Esta acción no se puede deshacer</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-700">
                            <strong>Venta a rembolsar:</strong> {saleget.items[0].product.name_product}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            <strong>Con cantidad:</strong> {saleget.items[0].product.quantity}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            <strong>Por un total:</strong>  ${saleget.total_price}
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirm}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}