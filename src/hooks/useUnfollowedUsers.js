import { useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";

export function useUnfollowedUsers(page = 1) {
    const { user: authUser } = useContext(AuthContext);
    const [search, setSearch] = useState("");

    const myUserId = authUser?.id;

    // Traer todos los usuarios
    const { data: allUsersDataRaw = [], isLoading: allUsersLoading, isError: allUsersError } =
        useApiQuery('allUsersData', page);

    // Traer la lista de quienes sigue el usuario autenticado
    const { data: followingData = [], isLoading: followingLoading, isError: followingError } =
        useApiQuery('followingPage', { userId: myUserId, page: 1 }, { enabled: !!myUserId });

    const loading = allUsersLoading || followingLoading;
    const error = allUsersError || followingError;

    // Filtrar usuarios: excluir al propio usuario y a los que ya sigue
    const unfollowedUsers = useMemo(() => {
        if (!allUsersDataRaw || !followingData) return [];

        return allUsersDataRaw
            .filter(user => user._id !== myUserId)
            .filter(user => !followingData.some(f => f._id === user._id))
            .filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.nick.toLowerCase().includes(search.toLowerCase())
            );
    }, [allUsersDataRaw, followingData, myUserId, search]);

    return { unfollowedUsers, search, setSearch, loading, error };
}
