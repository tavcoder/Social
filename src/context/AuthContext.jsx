/**
 * AuthContext for managing authentication state across the application.
 *
 * Provides user profile data from API, token, and authentication status.
 * Fetches full profile from API when authenticated.
 */
import { createContext, useState, useEffect } from "react";
import { useApiQuery } from "@/api";

export const AuthContext = createContext(null);

/**
 * AuthProvider component that wraps the app to provide authentication context.
 *
 * Manages user and token state, fetches full profile from API when authenticated.
 *
 * @param {Object} props - React props
 * @param {ReactNode} props.children - Child components
 */
export function AuthProvider(props) {
    // Initialize user from localStorage
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Initialize token from localStorage
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        console.log("AuthContext: Initializing token from localStorage", storedToken ? "present" : "null");
        return storedToken;
    });
    const isAuthenticated = !!token;

    // Listen for token changes in localStorage
    useEffect(() => {
        console.log("AuthContext: Setting up event listeners for token changes");
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                console.log("AuthContext: Storage event for token, updating to", e.newValue ? "present" : "null");
                setToken(e.newValue);
            }
        };
        const handleTokenChange = () => {
            const newToken = localStorage.getItem("token");
            console.log("AuthContext: Custom tokenChange event, updating token to", newToken ? "present" : "null");
            setToken(newToken);
        };
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('tokenChange', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('tokenChange', handleTokenChange);
        };
    }, []);

    // Fetch full user profile from API when authenticated
    const { data: authUserProfile } = useApiQuery("profile", user?.id, { enabled: !!user?.id });

    // Update user state with fetched profile data
    useEffect(() => {
        if (authUserProfile?.user) {
            setUser(authUserProfile.user);
        }
    }, [authUserProfile]);

    // Persist user to localStorage when updated
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    console.log("AuthContext: Rendering with user", user);
    // Provide context value with user data and auth state
    return (
        <AuthContext value={{
            user,
            setUser,
            token,
            isAuthenticated,
        }}
        >
            {props.children}
        </AuthContext>
    );
}