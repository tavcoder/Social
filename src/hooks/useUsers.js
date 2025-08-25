import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";

export function useUsers(initialPage = 1, itemsPerPage = 10, targetUserId = null) {
    const { user: authUser } = useContext(AuthContext);
    const [page, setPage] = useState(initialPage);
    const userId = targetUserId || authUser?.id;

    const { data: allUsersDataRaw = [], isLoading: allUsersLoading, isError: allUsersError } =
        useApiQuery("allUsersData", page);

    const { data: followingResponse, isLoading: followingLoading, isError: followingError } =
        useApiQuery("followingPage", { userId, page: 1 }, { enabled: !!userId });

    const followingIds = followingResponse?.user_following ?? [];
    const followersIds = followingResponse?.user_follow_me ?? [];

    const loading = allUsersLoading || followingLoading;
    const error = allUsersError || followingError;

    /**
     * Filtra usuarios según IDs a incluir o excluir
     * Siempre excluye al usuario actual
     */
    const filterUsers = ({ includeIds = null, excludeIds = [] } = {}) => {
        return allUsersDataRaw.filter(user => {
            if (user._id === userId) return false; // siempre excluir al usuario actual
            if (includeIds && !includeIds.includes(user._id)) return false;
            if (excludeIds.includes(user._id)) return false;
            return true;
        });
    };

    const users = filterUsers();
    const unfollowedUsers = filterUsers({ excludeIds: followingIds });
    const followers = filterUsers({ includeIds: followersIds });
    const following = filterUsers({ includeIds: followingIds });

    const hasMore = allUsersDataRaw.length === itemsPerPage;
    const loadMore = () => { if (hasMore) setPage(prev => prev + 1); };

    return {
        users,
        unfollowedUsers,
        following,
        followers,
        followingIds,
        followersIds,
        loading,
        error,
        page,
        setPage,
        hasMore,
        loadMore
    };
}
