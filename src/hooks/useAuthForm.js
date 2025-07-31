// src/hooks/useAuthForm.js
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export function useAuthForm(mode = "login") {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const updateField = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(formData); // Ahora el contexto maneja la lógica y la petición
        } catch (err) {
            setError(err.message);
        }
    };


    return {
        formData,
        error,
        updateField,
        handleSubmit,
    };
}
