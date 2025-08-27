import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";
import { useInfiniteApiQuery } from "../api/useInfiniteApiQuery";

export function useUsers(targetUserId = null, initialPage = 1) {
    const { user: authUser } = useContext(AuthContext);
    const [page, setPage] = useState(initialPage);

    const userId = targetUserId || authUser?.id;
    // Trae usuarios que siguen a este usuario
    const {
        data: followersPages,
        isLoading: followersLoading,
        isError: followersError,
        ...followersQuery
    } = useInfiniteApiQuery(
        "followersPage",
        [userId, page],   // 👈 Array, no objeto
        { enabled: !!userId }
    );

    // Trae usuarios que este usuario sigue
    const {
        data: followingPages,
        isLoading: followingLoading,
        isError: followingError,
        ...followingQuery
    } = useInfiniteApiQuery(
        "followingPage",
        [userId, page],   // 👈 Array, no objeto
        { enabled: !!userId }
    );


    // Trae todos los usuarios (para mostrar sugerencias o filtrados)
    const {
        data: allUsersData = [],
        isLoading: allUsersLoading,
        isError: allUsersError,
    } = useApiQuery("allUsersData", page);

    const loading = followingLoading || followersLoading || allUsersLoading;
    const error = followingError || followersError || allUsersError;

    // 🔹 Flatten de las páginas devueltas por useInfiniteApiQuery
    const followingData = followingPages?.pages.flatMap(p => p.data) ?? [];
    const followersData = followersPages?.pages.flatMap(p => p.data) ?? [];

    // Arrays de IDs de seguidores y seguidos
    const followingIds = followingData.map(user => user._id);
    const followersIds = followersData.map(user => user._id);

    // Función de filtrado
    const filterUsers = ({ includeIds = null, excludeIds = [] } = {}) =>
        allUsersData.filter(user => {
            if (user._id === userId) return false;
            if (includeIds && !includeIds.includes(user._id)) return false;
            if (excludeIds.includes(user._id)) return false;
            return true;
        });

    const users = filterUsers();
    const unfollowedUsers = filterUsers({ excludeIds: followingIds });
    const followers = filterUsers({ includeIds: followersIds });
    const following = filterUsers({ includeIds: followingIds });

    return {
        users,
        unfollowedUsers,
        followers,
        following,
        followingIds,
        followersIds,
        totalFollowers: followersIds.length,
        totalFollowing: followingIds.length,
        loading,
        error,
        page,
        setPage,
        // 🔹 Devuelvo también los queries infinitos por si quieres usarlos en UI
        followingQuery,
        followersQuery,
    };
}
