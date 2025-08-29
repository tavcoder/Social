import { useApiQuery } from "../api/useApiQuery";

export function useTopFollowers(userId, limit = 3) {
    const { data, isLoading, isError } = useApiQuery(
        "followers",
        [userId, 1],
        { enabled: !!userId }
    );

    // juntar los followers de todas las páginas
    const followersArray = data?.pages?.flatMap(page => page.data?.follows ?? []) ?? [];

    // tomar solo los primeros `limit`
    const topFollowers = followersArray.slice(0, limit);

    // total de followers (puedes usar length o page.data.total)
    const totalFollowers = followersArray.length;

    console.log("Revisando1:", topFollowers);

    return { topFollowers, totalFollowers, loading: isLoading, error: isError };
}
