import { X, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { useState } from 'react';

interface ExportModalProps {
  show: boolean;
  onClose: () => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const ExportModal = ({ show, onClose, onExportPDF, onExportExcel }: ExportModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | null>(null);

  const handleExport = () => {
    if (selectedFormat === 'pdf') {
      onExportPDF();
    } else if (selectedFormat === 'excel') {
      onExportExcel();
    }
    onClose();
    setSelectedFormat(null);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/60">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Exportar Productos</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Selecciona el formato en el que deseas exportar el listado de productos:
          </p>

          {/* Opción PDF */}
          <button
            onClick={() => setSelectedFormat('pdf')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedFormat === 'pdf'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                selectedFormat === 'pdf' ? 'bg-red-500' : 'bg-red-100'
              }`}>
                <FileText className={`h-6 w-6 ${
                  selectedFormat === 'pdf' ? 'text-white' : 'text-red-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-gray-900">Exportar a PDF</h4>
                <p className="text-sm text-gray-500">
                  Documento listo para imprimir o compartir
                </p>
              </div>
              {selectedFormat === 'pdf' && (
                <div className="h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>

          {/* Opción Excel */}
          <button
            onClick={() => setSelectedFormat('excel')}
            className={`w-full p-4 rounded-lg border-2 transition-all ${
              selectedFormat === 'excel'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${
                selectedFormat === 'excel' ? 'bg-green-500' : 'bg-green-100'
              }`}>
                <FileSpreadsheet className={`h-6 w-6 ${
                  selectedFormat === 'excel' ? 'text-white' : 'text-green-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-gray-900">Exportar a Excel</h4>
                <p className="text-sm text-gray-500">
                  Hoja de cálculo editable (.xlsx)
                </p>
              </div>
              {selectedFormat === 'excel' && (
                <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={handleExport}
            disabled={!selectedFormat}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              selectedFormat
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;