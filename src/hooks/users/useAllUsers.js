import { useContext, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AuthContext } from "@/context";
import { get } from "@/api/apiHelper";
import { queryEndpointsMap, querySelectMap } from "@/api";

export function useAllUsers() {
    const { user: authUser } = useContext(AuthContext);
    const userId = authUser?.id;

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
    return {
        allUsers,
        loading: allUsersLoading,
        error: allUsersError,
    };
}