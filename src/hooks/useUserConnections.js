// hooks/useUserConnections.js
import { useInfiniteApiQuery } from "../api/useInfiniteApiQuery";

export function useUserConnections(type, userId, initialPage = 1) {
    if (type !== "followers" && type !== "following") {
        throw new Error("type debe ser 'followers' o 'following'");
    }

    const { data, isLoading, isError, ...query } = useInfiniteApiQuery(
        type,
        [userId, initialPage],
        { enabled: !!userId }
    );

    const users = data?.pages.flatMap(p => p.data?.follows ?? []) ?? [];
    const ids = users.map(u => u._id);

    return {
        users,
        ids,
        total: users.length,
        loading: isLoading,
        error: isError,
        query,
    };
}
