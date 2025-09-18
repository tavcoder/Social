import { useMemo } from "react";

/**
 * Hook para manejar listas de usuarios y placeholders según type y userId
 */
export function usePeopleLists(type = "all", userId = null, users = [], followers = [], following = []) {
    return useMemo(() => {
        // Si hay userId, solo tiene sentido mostrar followers o following
        const effectiveType = userId
            ? (type === "followers" ? "followers" : "following")
            : type;

        const lists = {
            all: users,
            followers,
            following
        };

        const placeholders = {
            all: "Buscar usuarios...",
            followers: "Buscar seguidores...",
            following: "Buscar a quienes sigue..."
        };
      
        return {
            listToDisplay: lists[effectiveType] || users,
            placeholder: placeholders[effectiveType] || "Buscar usuarios..."
        };
    }, [type, userId, users, followers, following]);

}
