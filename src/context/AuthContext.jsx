//Almacena el estado global de autenticación 

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider(props) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = (credentials) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (foundUser) {
            const fakeToken = "token_fake_" + Date.now();
            localStorage.setItem("user", JSON.stringify(foundUser));
            localStorage.setItem("token", fakeToken);
            setUser(foundUser);
            setToken(fakeToken);
        } else {
            throw new Error("Credenciales incorrectas");
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
    );}
    