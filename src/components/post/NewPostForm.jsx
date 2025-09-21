import { useState } from "react";
import { Image } from "phosphor-react";
import { useApiMutation, uploadFile } from "@/api";
import { TextInput } from "@/components/common";
import { useFileUpload } from "@/hooks/common";


function NewPostForm() {
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { file, previewUrl, isLoading: fileLoading, selectFile, clearFile, uploadFile: uploadFileHook } = useFileUpload();
    const createPublicationMutation = useApiMutation("createPublication");
    const loading = createPublicationMutation.isLoading || fileLoading;

    const handleSend = async () => {
        setError(null);
        setSuccess(null);

        if (!text && !file) {
            setError("Debes escribir algo o subir una foto.");
            return;
        }

        try {
            // 1. Crear publicación con texto
            const response = await createPublicationMutation.mutateAsync({ text });

            if (!response?._id) {
                throw new Error("Error creando la publicación");
            }

            // 2. Si hay archivo, subirlo usando el hook
            if (file) {
                await uploadFileHook(async (fileToUpload) => {
                    const uploadData = await uploadFile(`publication/upload/${response._id}`, fileToUpload);
                    if (uploadData.status !== "success") {
                        throw new Error(uploadData.message || "Error subiendo archivo");
                    }
                    return uploadData;
                });
            }

            setSuccess("¡Post creado exitosamente!");
            setText("");
            clearFile();
        } catch (err) {
            setError(err.message || "Error desconocido");
        }
    };

    return (
        <div className="new__post__form card">
            <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSend={handleSend}
                placeholder="What´s on your mind?"
                disabled={loading}
                sendDisabled={!text.trim() && !file}
            />

            <label htmlFor="file" className="upload__btn">
                <Image className="icon" size={18} weight="bold" />
                <span className="upload__text">Image</span>
            </label>
            <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => selectFile(e.target.files[0])}
                disabled={loading}
                style={{ display: "none" }}
            />

            {previewUrl && (
                <div className="image-preview">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="preview-image"
                    />
                </div>
            )}

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default NewPostForm;