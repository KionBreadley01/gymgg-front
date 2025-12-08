"use client";

import { X, CreditCard, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AddMembershipToUserModalProps {
  show: boolean;
  onClose: () => void;
  onMembershipAdded: () => void;
  userId: string;
  userName: string;
  userEmail: string;
}

const AddMembershipToUserModal = ({
  show,
  onClose,
  onMembershipAdded,
  userId,
  userName,
  userEmail,
}: AddMembershipToUserModalProps) => {
  const [selectedMembership, setSelectedMembership] = useState("");
  const [datePay, setDatePay] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [memberships, setMemberships] = useState<
    { id: string; name_membership: string; duration_membership: string }[]
  >([]);

  useEffect(() => {
    if (show) {
      fetchMemberships();
      // Establecer fecha actual por defecto
      const today = new Date().toISOString().split('T')[0];
      setDatePay(today);
    }
  }, [show]);

  const fetchMemberships = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await fetch("http://localhost:8000/membership", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await response.json();
      setMemberships(data);
    } catch (err) {
      console.error("Error cargando membresías", err);
      toast.error("Error al cargar las membresías");
    }
  };

  const resetForm = () => {
    setSelectedMembership("");
    setDatePay("");
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMembership || !datePay) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`http://127.0.0.1:8000/useraccount/update/${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          membership_id: selectedMembership,
          date_pay: datePay,
        }),
      });

      if (response.ok) {
        toast.success("Membresía agregada exitosamente");
        resetForm();
        onMembershipAdded();
        onClose();
      } else {
        const error = await response.json();
        toast.error("Error al agregar membresía");
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  const selectedMembershipData = memberships.find(
    (m) => m.id === selectedMembership
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/60">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Agregar Membresía
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submitForm} className="p-6 space-y-4">
          {/* Información del usuario */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 font-medium">Usuario:</p>
            <p className="text-sm text-blue-700">{userName}</p>
            <p className="text-xs text-blue-600">{userEmail}</p>
          </div>

          {/* Selector de membresía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Membresía <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedMembership}
                onChange={(e) => setSelectedMembership(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona una membresía</option>
                {memberships.map((membership) => (
                  <option key={membership.id} value={membership.id}>
                    {membership.name_membership} - {membership.duration_membership}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fecha de pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Pago <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={datePay}
                onChange={(e) => setDatePay(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Vista previa de la membresía seleccionada */}
          {selectedMembershipData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium mb-1">
                Membresía seleccionada:
              </p>
              <p className="text-sm text-green-700">
                {selectedMembershipData.name_membership}
              </p>
              <p className="text-xs text-green-600">
                Duración: {selectedMembershipData.duration_membership}
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Procesando..." : "Agregar Membresía"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembershipToUserModal;