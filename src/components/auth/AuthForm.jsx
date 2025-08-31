//Interfaz visual que muetsra el formulario de autenticación
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
            <h3>{isLogin ? "" : "Join the comunity today"}</h3>

            {!isLogin && (
                <>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name || ""}
                        onChange={(e) => updateField("name", e.target.value)}
                        required
                        autoComplete="given-name"
                    />

                    <input
                        type="text"
                        name="surName"
                        placeholder="Apellido"
                        value={formData.surName || ""}
                        onChange={(e) => updateField("surName", e.target.value)}
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

            <button  className="btn" type="submit">
                {isLogin ? "Sign in" : "Sign up"}
            </button>

        </form>
    );
}

export default AuthForm;
