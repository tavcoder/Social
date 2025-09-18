// hooks/useUsers.js
import { useState, useContext } from "react";
import { AuthContext } from "@/context";
import { useFollowers, useFollowing, useAllUsers } from "@/hooks/users"

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
    const { allUsers, loading: allUsersLoading, error: allUsersError } = useAllUsers();

    const loading = followersLoading || followingLoading || allUsersLoading;
    const error = followersError || followingError || allUsersError;

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
