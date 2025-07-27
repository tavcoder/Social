function NewPostForm() {
    return (
        <form className="new-post-form" style={{ border: "1px solid #ddd", padding: "1rem" }}>
            <label htmlFor="text">¿Qué estás pensando hoy?</label>
            <textarea id="text" rows="3" style={{ width: "100%", marginTop: "0.5rem" }}></textarea>

            <label htmlFor="file" style={{ marginTop: "1rem", display: "block" }}>Sube tu foto</label>
            <input type="file" id="file" />

            <button type="submit" style={{ marginTop: "1rem", backgroundColor: "green", color: "white", padding: "0.5rem 1rem" }}>
                Enviar
            </button>
        </form>
    );
}

export default NewPostForm;
