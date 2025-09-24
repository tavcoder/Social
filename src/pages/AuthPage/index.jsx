/**
 * Authentication Page Component
 *
 * Main entry point for user authentication. Displays login or registration
 * forms with toggle functionality between modes. Includes social login
 * options and responsive design.
 */
import { useState } from "react";
import { AuthForm } from "./components";

/**
 * AuthPage component - Authentication landing page
 *
 * @returns {JSX.Element} Authentication page with login/register forms
 */
function AuthPage() {
    // State to toggle between login and register modes
    const [mode, setMode] = useState("login");

    /**
     * Toggle between login and register modes
     */
    const toggleMode = () => {
        setMode((prev) => (prev === "login" ? "register" : "login"));
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                {/* App logo */}
                <div className="logo">🔷 PEPPO</div>

                {/* Dynamic title based on auth mode */}
                <h2>{mode === "login" ? "Welcome Back!" : "Create Account"}</h2>

                {/* Dynamic subtitle with contextual message */}
                <p className="subtitle">
                    {mode === "login"
                        ? "We missed you! Please enter your details."
                        : "Let’s get you started. Please enter your information."}
                </p>

                {/* Main authentication form */}
                <AuthForm mode={mode} />

                {/* Social login divider */}
                <div className="divider">or</div>

                {/* Google OAuth button (placeholder) */}
                <button className="google-btn">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                    {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
                </button>

                {/* Toggle between login and register modes */}
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
