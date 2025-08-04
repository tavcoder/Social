import React, { useState } from "react";

function NewPostForm() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validar que haya texto o archivo
        if (!text && !file) {
            setError("Debes escribir algo o subir una foto.");
            setLoading(false);
            return;
        }

        try {
            // Preparar FormData para enviar texto y archivo
            const formData = new FormData();
            formData.append("text", text);
            if (file) formData.append("file", file);

            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3900/api/posts", {
                method: "POST",
                headers: {
                    // No ponemos content-type para que fetch lo maneje con multipart/form-data
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al crear el post");
            }

            setSuccess("¡Post creado exitosamente!");
            setText("");
            setFile(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

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
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                type="submit"
                style={{ marginTop: "1rem", backgroundColor: "green", color: "white", padding: "0.5rem 1rem" }}
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
