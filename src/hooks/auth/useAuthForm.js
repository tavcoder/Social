import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/context";

export function useAuthForm(mode = "login") {
    const {
        login,
        register,
        // Acceder a las propiedades de los objetos de estado con encadenamiento opcional
        loginStatus,
        registerStatus,
    } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        surName: "",
        nick: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            // La redirección aquí puede ser problemática si la mutación falla.
            // Es mejor manejarla dentro del "onSuccess" de la mutación.
            navigate("/feed");
        } catch (err) {
            // No hace falta setError porque ya lo tienes desde `loginStatus.error`
        }
    };

    // Usar el encadenamiento opcional para una lectura segura.
    const isLoading = mode === "login" ? loginStatus?.isLoading : registerStatus?.isLoading;
    const isError = mode === "login" ? loginStatus?.isError : registerStatus?.isError;
    const error = mode === "login" ? loginStatus?.error : registerStatus?.error;

    return {
        formData,
        updateField,
        handleSubmit,
        isLoading,
        isError,
        error,
    };
}