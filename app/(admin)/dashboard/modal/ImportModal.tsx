import { X, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

interface ImportModalProps {
    show: boolean;
    onClose: () => void;
    onProductsImported: () => void;
}

const ImportModal = ({ show, onClose, onProductsImported }: ImportModalProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!show) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleImport = async () => {
        if (!file) return;

        setLoading(true);
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                if (jsonData.length === 0) {
                    toast.warning("El archivo está vacío");
                    setLoading(false);
                    return;
                }

                setProgress({ current: 0, total: jsonData.length });
                const token = localStorage.getItem('access');
                const headers = {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                };

                // 1. Obtener categorías únicas del Excel
                const categoriesInExcel = new Set(jsonData.map((item: any) => item['Categoría'] || item['Category']));

                // 2. Obtener categorías existentes
                try {
                    const existingCategoriesRes = await fetch('http://127.0.0.1:8000/products/categories/', {
                        headers: {
                            "Accept": "application/json",
                            ...(token && { "Authorization": `Bearer ${token}` })
                        }
                    });
                    if (existingCategoriesRes.ok) {
                        const existingCategories = await existingCategoriesRes.json();
                        const existingCategoryNames = new Set(existingCategories.map((c: any) => c.name_category));

                        // 3. Crear categorías faltantes
                        for (const catName of Array.from(categoriesInExcel)) {
                            if (catName && !existingCategoryNames.has(catName)) {
                                try {
                                    console.log(`Creando categoría: ${catName}`);
                                    await fetch('http://127.0.0.1:8000/products/categories/create', {
                                        method: 'POST',
                                        headers,
                                        body: JSON.stringify({ name_category: catName })
                                    });
                                } catch (err) {
                                    console.error(`Error creando categoría ${catName}`, err);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error verificando categorías", error);
                    // Continue anyway
                }

                let successCount = 0;
                let errorCount = 0;

                for (let i = 0; i < jsonData.length; i++) {
                    const row: any = jsonData[i];

                    // Map Excel columns to API fields
                    const productData = {
                        name_product: row['Nombre'] || row['Name'],
                        category: row['Categoría'] || row['Category'],
                        price_product: row['Precio'] || row['Price'],
                        stock: row['Stock'],
                        description: row['Descripción'] || row['Description'] || '',
                        image_url: row['Imagen'] || row['Image'] || ''
                    };

                    if (!productData.name_product || !productData.category) {
                        console.warn(`Skipping row ${i + 1}: Missing name or category`);
                        errorCount++;
                        setProgress(prev => ({ ...prev, current: i + 1 }));
                        continue;
                    }

                    try {
                        const response = await fetch("http://127.0.0.1:8000/products/create", {
                            method: "POST",
                            headers,
                            body: JSON.stringify(productData)
                        });

                        if (response.ok) {
                            successCount++;
                        } else {
                            errorCount++;
                            console.error(`Error importing row ${i + 1}:`, await response.text());
                        }
                    } catch (error) {
                        errorCount++;
                        console.error(`Error importing row ${i + 1}:`, error);
                    }

                    setProgress(prev => ({ ...prev, current: i + 1 }));
                }

                toast.success(`Importación completada: ${successCount} exitosos, ${errorCount} fallidos`);
                onProductsImported();
                setFile(null);
                onClose();

            } catch (error) {
                toast.error('Error al procesar el archivo');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/60">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Importar Productos</h3>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
                            }`}
                        onClick={() => !loading && fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            disabled={loading}
                        />

                        {file ? (
                            <div className="flex flex-col items-center text-green-600">
                                <FileSpreadsheet className="h-10 w-10 mb-2" />
                                <span className="font-medium truncate max-w-full">{file.name}</span>
                                <span className="text-xs mt-1">Clic para cambiar</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <Upload className="h-10 w-10 mb-2" />
                                <span className="font-medium">Seleccionar archivo Excel</span>
                                <span className="text-xs mt-1">.xlsx o .xls</span>
                            </div>
                        )}
                    </div>

                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg flex items-start">
                        <AlertCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p>
                            El archivo debe tener las columnas: <span className="font-semibold">Nombre, Categoría, Precio, Stock, Descripción</span>.
                        </p>
                    </div>

                    {loading && (
                        <div className="space-y-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-yellow-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-center text-sm text-gray-600">
                                Procesando {progress.current} de {progress.total}...
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex space-x-3 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleImport}
                        disabled={!file || loading}
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${file && !loading
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {loading ? (
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                        <span>{loading ? 'Importando...' : 'Importar'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
