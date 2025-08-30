// hooks/useUsers.js
import { useState, useContext } from "react";
import { AuthContext } from "@/context";
import { useApiQuery } from "@/api";
import { useFollowers, useFollowing } from "@/hooks/users"

export function useUsers(targetUserId = null, initialPage = 1) {
    const { user: authUser } = useContext(AuthContext);
    const [page, setPage] = useState(initialPage);

    const userId = targetUserId || authUser?.id;

    // followers
    const {
        users: followers,
        ids: followersIds,
        total: totalFollowers,
        loading: followersLoading,
        error: followersError,
        query: followersQuery,
    } = useFollowers(userId, page);

    // following
    const {
        users: following,
        ids: followingIds,
        total: totalFollowing,
        loading: followingLoading,
        error: followingError,
        query: followingQuery,
    } = useFollowing(userId, page);

    // todos los usuarios
    const {
        data: allUsersData = [],
        isLoading: allUsersLoading,
        isError: allUsersError,
    } = useApiQuery("allUsersData", page);

    const loading = followersLoading || followingLoading || allUsersLoading;
    const error = followersError || followingError || allUsersError;

    // función de filtrado
    const filterUsers = ({ includeIds = null, excludeIds = [] } = {}) =>
        allUsersData.filter(user => {
            if (user._id === userId) return false;
            if (includeIds && !includeIds.includes(user._id)) return false;
            if (excludeIds.includes(user._id)) return false;
            return true;
        });

    const users = filterUsers();
    const unfollowedUsers = filterUsers({ excludeIds: followingIds });
    console.log("usershook", users)
    return {
        users,
        unfollowedUsers,
        followers: followers.filter(u => u._id !== userId),
        following: following.filter(u => u._id !== userId),
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
