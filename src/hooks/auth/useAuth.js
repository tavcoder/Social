/**
 * Custom hook for accessing the AuthContext.
 *
 * This hook provides access to authentication-related state and functions
 * from the AuthContext. It must be used within an AuthProvider component.
 *
 * @returns {Object} The AuthContext value containing user, login, register, etc.
 * @throws {Error} If used outside of AuthProvider.
 */
import { useContext } from "react";
import { AuthContext } from "@/context";

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
