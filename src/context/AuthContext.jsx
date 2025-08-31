import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const isAuthenticated = !!token;

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthProvider
            value={{
                user,
                setUser,
                token,
                setToken,
                isAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthProvider>
    );
}
