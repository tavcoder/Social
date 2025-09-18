import { useInfiniteApiQuery } from "@/api";

export function useUserConnections(type, userId, initialPage = 1) {
    if (type !== "followers" && type !== "following") {
        throw new Error("type debe ser 'followers' o 'following'");
    }

    const { data, isLoading, isError, ...query } = useInfiniteApiQuery(
        type,
        [userId, initialPage],
        { enabled: !!userId }
    );

    // extraer y unificar los usuarios
    const users = data?.pages.flatMap(p =>
        (p.data?.follows ?? []).map(follow => {
            if (type === "followers") return follow.user;   // el que sigue
            if (type === "following") return follow.followed; // el que es seguido
        })
    ) ?? [];

    const ids = users.map(u => u._id);

    console.log(`useUserConnections(${type}):`, users);

    return {
        users,
        ids,
        total: users.length,
        loading: isLoading,
        error: isError,
        query,
    };
}
