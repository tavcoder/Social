/**
 * Custom hook for managing user-related data and relationships.
 *
 * Aggregates followers, following, and all users data with filtering and pagination.
 * Handles deduplication and exclusion of current user.
 *
 * @param {string|null} targetUserId - ID of the target user (defaults to auth user).
 * @param {number} initialPage - Initial page for pagination.
 * @returns {Object} Users data, relationships, loading states, and pagination.
 */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context";
import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "@/api/apiHelper";
import { queryEndpointsMap, querySelectMap } from "@/api";
import useInfiniteApiQuery from "@/api/useInfiniteApiQuery";

export function useUsers(targetUserId = null, initialPage = 1) {
    const { user: authUser } = useContext(AuthContext);
    const [page, setPage] = useState(initialPage);

    const userId = targetUserId || authUser?.id;

    // followers
    const followersQuery = useInfiniteApiQuery("followers", [userId, page], { enabled: !!userId });
    const followers = followersQuery.data?.pages.flatMap(p =>
        (p.data?.follows ?? []).map(follow => follow.user).filter(Boolean)
    ) || [];
    const followersIds = followers.map(u => u._id);
    const totalFollowers = followersQuery.data?.pages[0]?.data?.total || 0;

    // following
    const followingQuery = useInfiniteApiQuery("following", [userId, page], { enabled: !!userId });
    const following = followingQuery.data?.pages.flatMap(p =>
        (p.data?.follows ?? []).map(follow => follow.followed).filter(Boolean)
    ) || [];
    const followingIds = following.map(u => u._id);
    const totalFollowing = followingQuery.data?.pages[0]?.data?.total || 0;

    // todos los usuarios
    const endpointFn = queryEndpointsMap["allUsersData"];
    const selectFn = querySelectMap["allUsersData"];
    const {
        data: allUsersQuery,
        isLoading: allUsersLoading,
        isError: allUsersError,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["allUsersData"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await get(endpointFn(pageParam));
            return { page: pageParam, data: selectFn(res) };
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || !Array.isArray(lastPage.data)) return undefined;
            return lastPage.data.length > 0 ? lastPage.page + 1 : undefined;
        },
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    // Fetch all pages
    useEffect(() => {
        if (hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage]);

    const allUsers = allUsersQuery?.pages.flatMap(page => page.data) || [];

    const loading = followersQuery.isLoading || followingQuery.isLoading || allUsersLoading;
    const error = followersQuery.isError || followingQuery.isError || allUsersError;

    // Deduplicar y excluir usuario actual
    const uniqueUsersData = allUsers.filter((user, index, self) =>
        index === self.findIndex(u => u._id === user._id) && user._id !== userId
    );

    // función de filtrado
    const filterUsers = ({ includeIds = null, excludeIds = [] } = {}) =>
        uniqueUsersData.filter(user => {
            if (includeIds && !includeIds.includes(user._id)) return false;
            if (excludeIds.includes(user._id)) return false;
            return true;
        });

    const users = filterUsers();
    const unfollowedUsers = filterUsers({ excludeIds: followingIds });
    const filteredFollowing = following.filter(u => u._id !== userId);
    return {
        users,
        unfollowedUsers,
        followers: followers.filter(u => u._id !== userId),
        following: filteredFollowing,
        followersIds,
        followingIds,
        totalFollowers,
        totalFollowing,
        loading,
        error,
        page,
        setPage,
        followersQuery,
        followingQuery,
    };
}
