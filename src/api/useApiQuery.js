import { useQuery } from "@tanstack/react-query";
import { get } from "./apiHelper";

const queryEndpointsMap = {
    profile: (id) => `user/profile/${id}`,
    following: (id) => `follow/following/${id}`,           // original
    followingPage: (params) => `follow/following/${params.userId}/${params.page}`,  // para la paginada
    followers: (id) => `follow/followers/${id}`,
    posts: (id) => `publication/user/${id}`,
    allUsersData: (page) => `user/list/${page}`,
};

const querySelectMap = {
    profile: (res) => res.user,
    following: (res) => res.total,
    followingPage: (res) => res,        // ajusta si quieres, depende de la estructura de respuesta
    followers: (res) => res.total,
    posts: (res) => res.total,
    allUsersData: (res) => res.users || [],
};

export function useApiQuery(key, param, options = {}) {
    if (!queryEndpointsMap[key]) {
        throw new Error(`No query endpoint found for key "${key}"`);
    }
    if (!querySelectMap[key]) {
        throw new Error(`No selector found for key "${key}"`);
    }

    return useQuery({
        queryKey: [key, param],
        enabled: options.enabled ?? !!param,
        queryFn: async () => {
            const res = await get(queryEndpointsMap[key](param));
            return querySelectMap[key](res);
        },
        retry: options.retry ?? 1,
        staleTime: options.staleTime ?? 1000 * 60,
        ...options,
    });
}
