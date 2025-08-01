import { useState, useContext } from "react";
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

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (mode === "login") {
                await login(formData);
            } else {
                await register(formData);
            }
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
