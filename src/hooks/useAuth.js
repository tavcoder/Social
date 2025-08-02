//Hook para acceder al contexto.
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
    return useContext(AuthContext);
}
