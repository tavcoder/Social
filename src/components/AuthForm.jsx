// src/components/AuthForm.jsx
import { useAuthForm } from "../hooks/useAuthForm";

function AuthForm({ mode = "login" }) {
    const {
        formData,
        error,
        updateField,
        handleSubmit,
        loginWithGoogle,
    } = useAuthForm(mode);

    const isLogin = mode === "login";

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>

            {!isLogin && (
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                />
            )}

            <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">
                {isLogin ? "Entrar" : "Crear cuenta"}
            </button>

            {isLogin && (
                <>
                    <p>O entra con:</p>
                    <button type="button" onClick={loginWithGoogle}>Google</button>
                </>
            )}
        </form>
    );
}

export default AuthForm;
