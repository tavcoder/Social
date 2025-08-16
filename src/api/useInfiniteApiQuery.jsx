import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "./apiHelper";
import Spinner from "../components/common/Spinner";
import { queryEndpointsMap, querySelectMap } from "./queryMaps";

export function useInfiniteApiQuery(key, params, options = {}) {
    if (!queryEndpointsMap[key] || !querySelectMap[key]) {
        throw new Error(`No query endpoint or selector found for key "${key}"`);
    }

    const endpointFn = queryEndpointsMap[key];
    const selectFn = querySelectMap[key];

    const loaderRef = useRef(null); // ✅ ahora useRef

    const query = useInfiniteQuery({
        queryKey: [key, ...(Array.isArray(params) ? params : [params])],
        queryFn: async ({ pageParam = 1 }) => {
            const args = Array.isArray(params) ? [...params] : [params];
            if (Array.isArray(params)) args[args.length - 1] = pageParam;
            const res = await get(endpointFn(...args));
            return { page: pageParam, data: selectFn(res) };
        },
        getNextPageParam: (lastPage) =>
            lastPage.data.length > 0 ? lastPage.page + 1 : undefined,
        retry: options.retry ?? 1,
        staleTime: options.staleTime ?? 1000 * 60,
        ...options,
    });

    // Scroll infinito automático
    useEffect(() => {
        if (!loaderRef.current || !query.hasNextPage || query.isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
                    query.fetchNextPage();
                }
            },
            { rootMargin: "200px", threshold: 0 }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage]);

    const InfiniteList = ({ children }) => (
        <>
            {children}
            {query.isFetchingNextPage && <Spinner />}
            <div ref={loaderRef} style={{ height: "1px" }} /> {/* ✅ ya no causa ciclo */}
        </>
    );

    return {
        ...query,
        InfiniteList,
        spinner: query.isLoading ? <Spinner /> : null,
    };
}
