'use client';

import apiService from "@/app/Service/apiService";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


 


interface DeleteUserProp {
    show: boolean;
    onClose:()=> void;
    onUserEdited: any;
    userSelected: any;
}



export default  function DeleteUserModal ({show, onClose, onUserEdited, userSelected}: DeleteUserProp){

  const [dataid, setDataid] = useState('');

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



    useEffect(() => {
      if (userSelected && show) {
        setDataid(userSelected.id || '')
        setMembership(userSelected.membership.name_membership|| "")
      }
    }, [userSelected, show]);



    const confirm = async () => {
      const response = await apiService.delete(`/useraccount/delete/${dataid}`)
      console.log(response)
      if(response.success){
        toast.success(`El ${userSelected.name} ha sido eliminado correctamente`);
        onUserEdited();
        onClose(); 
      }else {
        toast.error('Error al eliminar el producto');
        console.log(response)
      }  
    }
    

    if (!show || !userSelected) return null;
    
 
    return(
       <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Eliminar Producto</h3>
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
            <h4 className="text-lg font-medium text-gray-900">¿Estás seguro de elimina este usuario?</h4>
              <p className="text-gray-500">Esta acción no se puede deshacer</p>
            </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
              <strong>Usuario a eliminar:</strong> {userSelected.name} 
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