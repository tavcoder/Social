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
        console.log("useAuthActions: Starting login");
        const data = await loginMutation.mutateAsync({ ...credentials, method: "POST" });
        const { user, token } = data;
        console.log("useAuthActions: Login successful, setting user and token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        window.dispatchEvent(new Event('tokenChange'));
        console.log("useAuthActions: Dispatched tokenChange:", token);
    };

    /**
     * Register function that creates new user account and auto-logs in.
     *
     * @param {Object} userData - User registration data
     */
    const register = async (userData) => {
        console.log("useAuthActions: Starting register");
        const data = await registerMutation.mutateAsync({ ...userData, method: "POST" });
        const { user } = data;
        console.log("useAuthActions: Register successful, user created", user);
        // Auto-login after registration
        console.log("useAuthActions: Auto-logging in after registration");
        await login({ email: userData.email, password: userData.password });
    };

    /**
     * Logout function that clears user data and token.
     */
    const logout = () => {
        console.log("useAuthActions: Logging out, removing user and token from localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event('tokenChange'));
        console.log("useAuthActions: Dispatched tokenChange event for logout");
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