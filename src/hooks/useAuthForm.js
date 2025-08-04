import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

export function useAuthForm(mode = "login") {
    const { login, register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        surName: "",
        nick: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        console.log(formData);//imprime el contenido cada vez q se escribe en el input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (mode === "login") {
                const loginData = {
                    email: formData.email,
                    password: formData.password,
                };
                await login(loginData);
            } else {
                await register(formData);
            }

            // ✅ Redirigir al home tras éxito
            navigate("/");
        } catch (err) {
            setError(err.message || "Error inesperado");
        }
    };

    return {
        formData,
        error,
        updateField,
        handleSubmit,
    };
}