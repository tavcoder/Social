// Componente de composición, verifica si el usuario está autenticado
// Componente para rutas protegidas que requieren autenticación - Props: children (ReactNode)
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "@/context";

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    // Si no hay usuario, redirige al login
    if (!user) return <Navigate to="/" />;

    return children;
}

export default PrivateRoute;
