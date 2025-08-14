import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { get } from "./apiHelper";

const queryEndpointsMap = {
    profile: (id) => `user/profile/${id}`,//userProfileSidebar
    counters: (id) => `user/counters/${id}`,//userProfileSidebar
    userPosts: (id, page) => `publication/user/${id}/${page}`,//PostList
    followingPosts: (page) => `publication/feed/${page}`,//PostList//CommentsItems
    following: (id) => `follow/following/${id}`,
    followingPage: (params) => `follow/following/${params.userId}/${params.page}`,
    followers: (id) => `follow/followers/${id}`,
    avatar: (file) => `user/avatar/${file}`,
    allUsersData: (page) => `user/list/${page}`,
};

const querySelectMap = {
    profile: (res) => res,
    userPosts: (res) => res.publications,
    followingPosts: (res) => res.publications,
    counters: (res) => res,
    following: (res) => res.total,
    followingPage: (res) => res,
    followers: (res) => res.total,
    allUsersData: (res) => res.users || [],
};

export function useApiQuery(key, params, options = {}) {
    if (!queryEndpointsMap[key]) {
        throw new Error(`No query endpoint found for key "${key}"`);
    }
    if (!querySelectMap[key]) {
        throw new Error(`No selector found for key "${key}"`);
    }

    const endpointFn = queryEndpointsMap[key];
    const selectFn = querySelectMap[key];

    // 🔹 Si el modo infinite está activado
    if (options.infinite) {
        return useInfiniteQuery({
            queryKey: [key, ...(Array.isArray(params) ? params : [params])],
            queryFn: async ({ pageParam = 1 }) => {
                let res;
                if (Array.isArray(params)) {
                    // Sustituimos el último elemento (page) por pageParam
                    const args = [...params];
                    args[args.length - 1] = pageParam;
                    res = await get(endpointFn(...args));
                } else {
                    res = await get(endpointFn(pageParam));
                }
                return { page: pageParam, data: selectFn(res) };
            },
            getNextPageParam: (lastPage) => {
                // Si la página tiene datos, avanzamos a la siguiente
                return lastPage.data.length > 0 ? lastPage.page + 1 : undefined;
            },
            retry: options.retry ?? 1,
            staleTime: options.staleTime ?? 1000 * 60,
            ...options,
        });
    }

    // 🔹 Modo normal
    return useQuery({
        queryKey: Array.isArray(params) ? [key, ...params] : [key, params],
        enabled: options.enabled ?? !!params,
        queryFn: async () => {
            let res;
            if (Array.isArray(params)) {
                res = await get(endpointFn(...params));
            } else {
                res = await get(endpointFn(params));
            }
            return selectFn(res);
        },
        retry: options.retry ?? 1,
        staleTime: options.staleTime ?? 1000 * 60,
        ...options,
    });
}
