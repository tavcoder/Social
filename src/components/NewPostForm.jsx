import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { callApi } from "../api/apiHelper";
import { AuthContext } from "../context/AuthContext.jsx";

function NewPostForm() {
    const { token } = useContext(AuthContext);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Mutation para crear publicación (solo texto)
    const createPublicationMutation = useMutation({
        mutationFn: (newPost) => callApi("POST", "publication/save", newPost),
    });

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!text && !file) {
            setError("Debes escribir algo o subir una foto.");
            return;
        }

        try {
            // 1. Crear publicación con texto (el API requiere solo texto)
            const response = await createPublicationMutation.mutateAsync({ text });

            if (response.status !== "success") {
                throw new Error(response.message || "Error creando la publicación");
            }

            // 2. Si hay archivo, subirlo con fetch y FormData directamente
            if (file) {
                const formData = new FormData();
                formData.append("file0", file);

                // Suponiendo que el endpoint para subir archivo es algo como:
                // /publication/upload-file/:id
                const uploadRes = await fetch(
                    `http://localhost:3900/api/publication/upload/${response.publicationStored._id}`,
                    {
                        method: "POST",
                        headers: {
                            ...(token && { Authorization: token }), // OJO: Bearer
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
    }

    const loading = createPublicationMutation.isLoading;

    return (
        <form
            className="new-post-form"
            style={{ border: "1px solid #ddd", padding: "1rem" }}
            onSubmit={handleSubmit}
        >
            <label htmlFor="text">¿Qué estás pensando hoy?</label>
            <textarea
                id="text"
                rows="3"
                style={{ width: "100%", marginTop: "0.5rem" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            <label htmlFor="file" style={{ marginTop: "1rem", display: "block" }}>
                Sube tu foto
            </label>
            <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    console.log("file content:", selectedFile);
                }}
            />

            <button
                type="submit"
                style={{
                    marginTop: "1rem",
                    backgroundColor: "green",
                    color: "white",
                    padding: "0.5rem 1rem",
                }}
                disabled={loading}
            >
                {loading ? "Enviando..." : "Enviar"}
            </button>

            {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
        </form>
    );
}

export default NewPostForm;
