// Componente de composición, verifica si el usuario está autenticado
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    // Si no hay usuario, redirige al login
    if (!user) return <Navigate to="/" />;

    return children;
}

export default PrivateRoute;
