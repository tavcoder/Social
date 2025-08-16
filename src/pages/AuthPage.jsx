// página inicial del sitio muestra el formulario de login o registro
// en dependencia de la prop que s ele pase.

import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";

function AuthPage() {
    const [mode, setMode] = useState("login");

    const toggleMode = () => {
        setMode((prev) => (prev === "login" ? "register" : "login"));
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="logo">🔷 PEPPO</div>
                <h2>{mode === "login" ? "Welcome Back!" : "Create Account"}</h2>
                <p className="subtitle">
                    {mode === "login"
                        ? "We missed you! Please enter your details."
                        : "Let’s get you started. Please enter your information."}
                </p>

                <AuthForm mode={mode} />

                <div className="divider">or</div>

                <button className="google-btn">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                    {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
                </button>

                <p className="bottom-text">
                    {mode === "login" ? (
                        <>
                            Don’t have an account?{" "}
                            <button className="link-btn" onClick={toggleMode}>
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button className="link-btn" onClick={toggleMode}>
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default AuthPage;
