import { useContext } from "react";
import { useApiMutation } from "@/api";
import { AuthContext } from "@/context";

/**
 * Custom hook for authentication actions (login, register, logout).
 *
 * Handles API calls and updates auth state via context.
 *
 * @returns {Object} login, register, logout functions and status.
 */
export function useAuthActions() {
    const { setUser } = useContext(AuthContext);

    // Mutations for login and register (no cache invalidation needed)
    const loginMutation = useApiMutation("login", null);
    const registerMutation = useApiMutation("register", null);

    /**
     * Login function that authenticates user and updates state.
     *
     * @param {Object} credentials - Login credentials (email, password)
     */
    const login = async (credentials) => {
        const data = await loginMutation.mutateAsync({ ...credentials, method: "POST" });
        const { user, token } = data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        window.dispatchEvent(new Event('tokenChange'));
    };

    /**
     * Register function that creates new user account and auto-logs in.
     *
     * @param {Object} userData - User registration data
     */
    const register = async (userData) => {
        const data = await registerMutation.mutateAsync({ ...userData, method: "POST" });
        const { user } = data;
        // Auto-login after registration
        await login({ email: userData.email, password: userData.password });
    };

    /**
     * Logout function that clears user data and token.
     */
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event('tokenChange'));
    };

    return {
        login,
        register,
        logout,
        loginStatus: {
            isLoading: loginMutation.isLoading,
            isError: loginMutation.isError,
            error: loginMutation.error,
        },
        registerStatus: {
            isLoading: registerMutation.isLoading,
            isError: registerMutation.isError,
            error: registerMutation.error,
        },
    };
}