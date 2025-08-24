import { useState, useContext, useMemo } from "react";
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

    const unfollowedUsers = useMemo(() => {
        if (!allUsersDataRaw) return [];
        return allUsersDataRaw
            .filter(user => user._id !== userId)
            .filter(user => !followingIds.includes(user._id));
    }, [allUsersDataRaw, followingIds, userId]);

    const followers = useMemo(() => {
        if (!allUsersDataRaw) return [];
        return allUsersDataRaw.filter(user => followersIds.includes(user._id));
    }, [allUsersDataRaw, followersIds]);

    const hasMore = allUsersDataRaw.length === itemsPerPage;
    const loadMore = () => { if (hasMore) setPage(prev => prev + 1); };

    return {
        users: allUsersDataRaw,
        unfollowedUsers,
        followingIds,
        followersIds,
        followers,
        loading,
        error,
        page,
        setPage,
        hasMore,
        loadMore
    };
}
