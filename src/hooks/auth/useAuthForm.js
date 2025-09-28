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
import { useUserValidation } from "@/hooks/validations";

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

    const includePassword = mode === 'register';
    const { errors: validationErrors, validateAll } = useUserValidation(formData, includePassword);

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const { isValid } = validateAll();
        if (!isValid) {
            const errorMessages = Object.values(validationErrors).flat();
            setError(errorMessages.join("\n"));
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
        } catch {
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
