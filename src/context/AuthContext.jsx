import { createContext, useState } from "react";
import { useApiMutation } from "@/api";

export const AuthContext = createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const isAuthenticated = !!token;

    const loginMutation = useApiMutation("login", null); // null porque no necesitamos cache invalidation
    const registerMutation = useApiMutation("register", null);

    // Wrap para agregar side effects específicos de login/register
    const login = async (credentials) => {
        const data = await loginMutation.mutateAsync({ ...credentials, method: "POST" });
        const { user, token } = data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        setToken(token);
    };

    const register = async (userData) => {
        const data = await registerMutation.mutateAsync({ ...userData, method: "POST" });
        const { user, token } = data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext value={{
            user,
            setUser,
            token,
            setToken,
            isAuthenticated,
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
        }}
        >
            {props.children}
        </AuthContext>
    );
}