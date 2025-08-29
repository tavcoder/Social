import { useApiQuery } from "../api/useApiQuery";

export function useTopFollowers(userId, limit = 3) {
    // La API no tiene parámetro limit, así que usamos page=1 y itemsPerPage=limit
    const { data, isLoading, isError } = useApiQuery(
        "followers", [userId, 1],
        { enabled: !!userId }
    );

    // Tomamos solo los primeros `limit` usuarios
    const topFollowers = data?.follows?.slice(0, limit) || [];
    const totalFollowers = data?.total || 0;

    return { topFollowers, totalFollowers, loading: isLoading, error: isError };
}
