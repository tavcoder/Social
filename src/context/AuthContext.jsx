//Contexto dinámico de autenticación, guarda el user y el token, 
// define las funciones login y logout.

import { createContext, useState } from "react";
import { callApi } from "../services/fetcher";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (credentials) => {
        try {
            const data = await callApi("POST", "login", credentials);
            if (data?.token && data?.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setToken(data.token);
            } else {
                throw new Error(data.message || "Error en login");
            }
        } catch (err) {
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            const data = await callApi("POST", "register", userData);
            if (data?.token && data?.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setToken(data.token);
            } else {
                throw new Error(data.message || "Error en registro");
            }
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthProvider value={{ user, token, login, register, logout }}>
            {children}
        </AuthProvider>
    );
}