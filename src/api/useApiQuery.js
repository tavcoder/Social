// useApiQuery.js
import { useQuery } from "@tanstack/react-query";
import { get } from "./apiHelper";
import { queryEndpointsMap, querySelectMap } from "./queryMaps";

export function useApiQuery(key, params, options = {}) {
    if (!queryEndpointsMap[key] || !querySelectMap[key]) {
        throw new Error(`No endpoint or selector found for key "${key}"`);
    }

    const endpointFn = queryEndpointsMap[key];
    const selectFn = querySelectMap[key];

    return useQuery({
        queryKey: Array.isArray(params) ? [key, ...params] : [key, params],
        enabled: options.enabled ?? !!params,
        queryFn: async () => {
            const args = Array.isArray(params) ? params : [params];
            const res = await get(endpointFn(...args));
            return selectFn(res);
        },
        retry: options.retry ?? 1,
        staleTime: options.staleTime ?? 1000 * 60,
        ...options,
    });
}
