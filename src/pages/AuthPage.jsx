// página inicial del sitio muestra el formulario de login o registro

import AuthForm from "../components/AuthForm";

function AuthPage() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create an Account</h2>
                <AuthForm mode="register" />
            </div>
        </div>
    );
}

export default AuthPage;
