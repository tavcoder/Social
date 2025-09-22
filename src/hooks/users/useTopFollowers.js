// hooks/useTopFollowers.js
import useInfiniteApiQuery from "@/api/useInfiniteApiQuery";

export function useTopFollowers(userId, limit = 3) {
    const query = useInfiniteApiQuery("followers", [userId, 1], { enabled: !!userId });
    const followers = query.data?.pages.flatMap(p =>
        (p.data?.follows ?? []).map(follow => follow.user).filter(Boolean)
    ) || [];
    const totalFollowers = query.data?.pages[0]?.data?.total || 0;

    return {
        topFollowers: followers.slice(0, limit),
        totalFollowers,
        loading: query.isLoading,
        error: query.isError,
    };
}
