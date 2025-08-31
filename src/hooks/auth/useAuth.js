//Hook para acceder al contexto.
import { useContext } from "react";
import { AuthContext, useLogin, useRegister } from "@/context";

export function useAuth() {
    const context = useContext(AuthContext);
    const loginHook = useLogin();
    const registerHook = useRegister();

    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return {
        ...context,
        login: loginHook.login,
        loginStatus: {
            isLoading: loginHook.isLoading,
            isError: loginHook.isError,
            error: loginHook.error,
        },
        register: registerHook.register,
        registerStatus: {
            isLoading: registerHook.isLoading,
            isError: registerHook.isError,
            error: registerHook.error,
        },
    };
}

