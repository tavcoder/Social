import { createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { callApi } from "../services/fetcher";

export const AuthContext = createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const isAuthenticated = !!token;

    const loginMutation = useMutation({
        mutationFn: (credentials) => callApi("POST", "user/login", credentials),
        onSuccess: (data) => {
            const { user, token } = data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setUser(user);
            setToken(token);
        },
    });

    const registerMutation = useMutation({
        mutationFn: (userData) => callApi("POST", "user/register", userData),
        onSuccess: (data) => {
            const { user, token } = data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setUser(user);
            setToken(token);
        },
    });


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
            login: loginMutation.mutateAsync,
            register: registerMutation.mutateAsync,
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
            }
        }}>
            {props.children}
        </AuthContext>
    );
}