// Componente de composición, verifica si el usuario está autenticado
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "@/context";

function PrivateRoute({ children }) {
    const auth = useContext(AuthContext);

    // Si el contexto no existe o no hay usuario -> redirige
    if (!auth || !auth.user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;
