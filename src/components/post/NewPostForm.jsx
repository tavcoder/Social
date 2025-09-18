import { useState, useContext } from "react";
// Componente para el formulario de crear nuevos posts - Props: ninguna
import { Image } from "phosphor-react";
import { useApiMutation } from "@/api";
import { AuthContext } from "@/context";
import { TextInput} from "@/components/common";


function NewPostForm() {
    const { token } = useContext(AuthContext); // ✅ dentro del componente
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

            // 2. Si hay archivo, subirlo
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
        <div className="new__post__form card">
            <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSend={handleSend}
                placeholder="What´s on your mind?"
                disabled={loading}
            />

            <label htmlFor="file" className="upload__btn">
                <Image className="icon" size={18} weight="bold" />
                <span className="upload__text">Image</span>
            </label>
            <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={loading}
                style={{ display: "none" }}
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
}

export default NewPostForm;
