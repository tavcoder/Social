// hooks/useTopFollowers.js
import { useFollowers } from "@/hooks/users"

export function useTopFollowers(userId, limit = 3) {
    const {
        users: followers,
        total: totalFollowers,
        loading,
        error,
    } = useFollowers(userId);
    console.log("useTopFollowers:", followers);
    return {
        topFollowers: followers.slice(0, limit),
        totalFollowers,
        loading,
        error,
    };
}
