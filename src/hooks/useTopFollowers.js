// hooks/useTopFollowers.js
import { useFollowers } from "./useFollowers";

export function useTopFollowers(userId, limit = 3) {
    const {
        users: followers,
        total: totalFollowers,
        loading,
        error,
    } = useFollowers(userId);

    return {
        topFollowers: followers.slice(0, limit),
        totalFollowers,
        loading,
        error,
    };
}
