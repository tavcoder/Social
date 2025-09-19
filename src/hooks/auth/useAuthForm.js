/**
 * Custom hook for managing authentication forms (login/register).
 *
 * Handles form state, submission, and navigation for login and registration.
 * Supports both login and register modes, managing loading states and errors.
 *
 * @param {string} mode - The form mode: "login" or "register" (default: "login").
 * @returns {Object} Form data, handlers, and status.
 */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthActions } from "@/hooks/auth";

export function useAuthForm(mode = "login") {
    const {
        login,
        register,
        loginStatus,
        registerStatus,
    } = useAuthActions();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        nick: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        const errors = [];
        if (mode === "register") {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
            const nickRegex = /^[a-zA-Z0-9_]+$/;

            if (!formData.name || !nameRegex.test(formData.name.trim())) {
                errors.push("El nombre solo debe contener letras y espacios.");
            }
            if (!formData.surname || !nameRegex.test(formData.surname.trim())) {
                errors.push("El apellido solo debe contener letras y espacios.");
            }
            if (!formData.nick || !nickRegex.test(formData.nick.trim())) {
                errors.push("El nick solo debe contener letras, números y guiones bajos.");
            }
            if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                errors.push("El email no tiene un formato válido.");
            }
            if (!formData.password || formData.password.length < 6) {
                errors.push("La contraseña debe tener al menos 6 caracteres.");
            }
        } else if (mode === "login") {
            if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                errors.push("El email no tiene un formato válido.");
            }
            if (!formData.password || formData.password.length < 1) {
                errors.push("La contraseña es requerida.");
            }
        }

        if (errors.length > 0) {
            setError(errors.join("\n"));
            return;
        }

        try {
            setError(null); // Clear any previous validation errors
            if (mode === "login") {
                const loginData = {
                    email: formData.email,
                    password: formData.password,
                };
                await login(loginData);
            } else {
                await register(formData);
            }

            navigate("/feed");
        } catch (err) {
            // Error handling is done via status
        }
    };

    const isLoading = mode === "login" ? loginStatus.isLoading : registerStatus.isLoading;
    const isError = mode === "login" ? (loginStatus.isError || !!error) : (registerStatus.isError || !!error);
    const displayError = error || (mode === "login" ? loginStatus.error : registerStatus.error);

    return {
        formData,
        updateField,
        handleSubmit,
        isLoading,
        isError,
        error: displayError,
    };
}
