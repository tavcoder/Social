import { useState, useContext } from "react";
import { useApiMutation } from "../api/useApiMutation";
import { AuthContext } from "../context/AuthContext.jsx";
import ChatInput from "./ChatInput"; // Asegúrate de que la ruta sea correcta

function NewPostForm() {
    const { token } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const createPublicationMutation = useApiMutation("addPost");
    const loading = createPublicationMutation.isLoading;

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

            if (!response?.publicationStored?._id) {
                throw new Error("Error creando la publicación");
            }

            // 2. Si hay archivo, subirlo con fetch
            if (file) {
                const formData = new FormData();
                formData.append("file0", file);

                const uploadRes = await fetch(
                    `http://localhost:3900/api/publication/upload/${response.publicationStored._id}`,
                    {
                        method: "POST",
                        headers: {
                            ...(token && { Authorization: token }),
                        },
                        body: formData,
                    }
                );

                const uploadData = await uploadRes.json();
                if (uploadData.status !== "success") {
                    throw new Error(uploadData.message || "Error subiendo archivo");
                }
            }

            setSuccess("¡Post creado exitosamente!");
            setText("");
            setFile(null);
        } catch (err) {
            setError(err.message || "Error desconocido");
        }
    };

    return (
        <div className="new-post-form" style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <label htmlFor="text">¿Qué estás pensando hoy?</label>

            <ChatInput
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSend={handleSend}
                placeholder="Escribe tu publicación..."
                disabled={loading}
            />

            <label htmlFor="file" style={{ marginTop: "1rem", display: "block" }}>
                Sube tu foto
            </label>
            <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={loading}
            />

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
        </div>
    );
}

export default NewPostForm;