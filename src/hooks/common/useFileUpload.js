import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar subida y previsualización de archivos
 * Gestiona la selección de archivos, creación de URLs de previsualización,
 * y ejecución de funciones de subida personalizadas
 */
export function useFileUpload() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Crear/limpiar URL de previsualización cuando cambia el archivo
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url); // Cleanup para prevenir fugas de memoria
        } else {
            setPreviewUrl(null);
        }
    }, [file]);

    /**
     * Selecciona un archivo y actualiza el estado
     * @param {File} selectedFile - Archivo seleccionado por el usuario
     */
    const selectFile = (selectedFile) => {
        setFile(selectedFile);
    };

    /**
     * Limpia el archivo seleccionado y la previsualización
     */
    const clearFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };

    /**
     * Ejecuta una función de subida personalizada
     * @param {Function} uploadFunction - Función que realiza la subida (debe retornar una Promise)
     * @returns {Promise} Resultado de la función de subida
     */
    const uploadFile = async (uploadFunction) => {
        if (!file) {
            throw new Error("No file selected");
        }

        setIsLoading(true);
        try {
            const result = await uploadFunction(file);
            return result;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        file,
        previewUrl,
        isLoading,
        selectFile,
        clearFile,
        uploadFile
    };
}