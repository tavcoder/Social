import { useState, useEffect } from "react";

const EditUserProfile = () => {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        bio: "",
        nick: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    // Cargar datos del usuario (ejemplo: de localStorage o de tu API profile)
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setForm({
                ...form,
                name: storedUser.name || "",
                surname: storedUser.surname || "",
                bio: storedUser.bio || "",
                nick: storedUser.nick || "",
                email: storedUser.email || ""
            });
        }
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3900/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Perfil actualizado con éxito 🎉");
                // Guardar cambios en localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                setMessage("Error: " + data.message);
            }
        } catch (error) {
            setMessage("Hubo un error en la conexión con el servidor ❌");
        }
    };

    return (
        <div className="profile-form-container card">
            <h2 className="form-title">Editar Perfil</h2>

            {message && <p className="status-message">{message}</p>}

            <form onSubmit={handleSubmit} className="form-grid">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Apellido"
                    value={form.surname}
                    onChange={handleChange}
                    className="form-input"
                />
                <textarea
                    name="bio"
                    placeholder="Biografía"
                    value={form.bio}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="nick"
                    placeholder="Nick"
                    value={form.nick}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Nueva contraseña (opcional)"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                />

                <button
                    type="submit"
                    className="save-button"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default EditUserProfile;