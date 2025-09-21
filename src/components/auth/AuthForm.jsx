//Interfaz visual que muetsra el formulario de autenticación
// Componente para el formulario de autenticación (login y registro de usuarios) - Props: mode (string, opcional, default "login")
//usa la lógica del useAuthForm
import { useAuthForm } from "@/hooks/auth";

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
        <form onSubmit={handleSubmit} className="auth-form" autoComplete="on">
            <h2>{isLogin ? "Login" : "Register"}</h2>

            {!isLogin && (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name || ""}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        autoComplete="given-name"
                    />

                    <input
                        type="text"
                        name="surname"
                        placeholder="Surname"
                        value={formData.surname || ""}
                        onChange={(e) => updateField("surname", e.target.value)}
                        required
                        autoComplete="family-name"
                    />

                    <input
                        type="text"
                        name="nick"
                        placeholder="Nick"
                        value={formData.nick || ""}
                        onChange={(e) => updateField("nick", e.target.value)}
                        required
                        autoComplete="nickname"
                    />
                </>
            )}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                required
                autoComplete="email"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password || ""}
                onChange={(e) => updateField("password", e.target.value)}
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">
                {isLogin ? "Login" : "Create account"}
            </button>

            {isLogin && (
                <>
                    <p>Or login with:</p>
                    <button type="button" onClick={loginWithGoogle}>Google</button>
                </>
            )}
        </form>
    );
}

export default AuthForm;
