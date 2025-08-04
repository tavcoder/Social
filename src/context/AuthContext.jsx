import { createContext, useState } from "react";
import { callApi } from "../services/fetcher"; 

export const AuthContext = createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (credentials) => {
        console.log(credentials);
        // eslint-disable-next-line no-useless-catch
        try {
            const data = await callApi("POST", "user/login", credentials);

            if (data.token && data.user) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setToken(data.token);
                setUser(data.user);
            } else {
                throw new Error(data.message || "Error en el login");
            }
        } catch (error) {
            throw error;
        }
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const emailExists = users.some((u) => u.email === userData.email);

        if (emailExists) {
            throw new Error("El email ya está registrado");
        }

        const updatedUsers = [...users, userData];
        const fakeToken = "token_fake_" + Date.now();

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", fakeToken);

        setUser(userData);
        setToken(fakeToken);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext value={{ user, token, login, register, logout }}>
            {props.children}
        </AuthContext>
    );
}