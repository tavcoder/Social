import { useMemo } from "react";

/**
 * Hook para manejar listas de usuarios, placeholders y mensajes según type y userId
 */
export function usePeopleLists(
    type = "all",
    userId = null,
    users = [],
    followers = [],
    following = []
) {
    return useMemo(() => {
        // Determinar el tipo efectivo
        const effectiveType = userId
            ? (type === "followers" ? "followers" : "following")
            : type;

        // Listas de usuarios según tipo
        const lists = {
            all: users,
            followers,
            following
        };

        // Placeholders para el buscador
        const placeholders = {
            all: "Search users...",
            followers: "Search followers...",
            following: "Search who they follow..."
        };

        // Mensajes para listas vacías
        const emptyMessages = {
            all: "",
            followers: "Your community is growing… 🌱 Share your knowledge and connect with other caregivers so they can follow you and support each other.",
            following: "For now, your following list is empty, but there are amazing caregivers waiting for you.Take a look at People or our suggestions and start connecting."
        };

        const listToDisplay = lists[effectiveType] || users;
        const placeholder = placeholders[effectiveType] || "Buscar usuarios...";
        const emptyMessage = emptyMessages[effectiveType] || "No hay usuarios para mostrar.";

        return { listToDisplay, placeholder, emptyMessage };
    }, [type, userId, users, followers, following]);
}
