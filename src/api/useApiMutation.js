import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/api/apiHelper";
import { mutationEndpointsMap, mutationMethodMap, mutationSelectMap } from "@/api/mutationMaps";

/**
 * Custom hook for API mutations with optimistic updates.
 *
 * This hook wraps React Query's useMutation to provide a standardized way to perform
 * API mutations with automatic optimistic updates for supported operations. It handles
 * endpoint resolution, method selection, response transformation, and cache invalidation.
 *
 * @param {string} mutationKey - The key identifying the mutation type (e.g., "follow", "createPublication")
 * @param {Array} queryKeyToUpdate - The query key array to invalidate and optimistically update
 * @returns {Object} React Query mutation object with additional properties:
 *   - mutate: Function to trigger the mutation
 *   - isPending: Boolean indicating if the mutation is in progress
 *   - isError: Boolean indicating if the mutation failed
 *   - error: Error object if the mutation failed
 *   - data: Response data from successful mutation
 *   - reset: Function to reset the mutation state
 *
 * @example
 * const followMutation = useApiMutation("follow", ["following", userId]);
 * followMutation.mutate({ followed: targetUserId });
 */
export default function useApiMutation(mutationKey, queryKeyToUpdate) {
    const queryClient = useQueryClient();

    if (!mutationEndpointsMap[mutationKey]) throw new Error(`No mutation endpoint for key "${mutationKey}"`);
    if (!mutationSelectMap[mutationKey]) throw new Error(`No selector for key "${mutationKey}"`);

    const endpointFn = mutationEndpointsMap[mutationKey];
    const selectFn = mutationSelectMap[mutationKey];
    const method = mutationMethodMap[mutationKey] || "POST";

    return useMutation({
        mutationFn: async (variables) => {
            const endpoint = endpointFn(variables);
            const response = await callApi(method, endpoint, variables);
            return selectFn(response);
        },

        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: queryKeyToUpdate, exact: false });
            const previousData = queryClient.getQueriesData({ queryKey: queryKeyToUpdate, exact: false });

            queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, (old) => {
                if (!old) return old;

                if (mutationKey === "deletePublication" || mutationKey === "removeComment") {
                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            data: page.data.filter((item) => item._id !== (variables.id || variables.commentId)),
                        })),
                    };
                }

                return old;
            });

            return { previousData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                // Only restore data if it has the correct structure for infinite queries
                const hasValidInfiniteStructure = context.previousData &&
                    typeof context.previousData === 'object' &&
                    'pages' in context.previousData &&
                    'pageParams' in context.previousData &&
                    Array.isArray(context.previousData.pages) &&
                    Array.isArray(context.previousData.pageParams);

                if (hasValidInfiniteStructure) {
                    queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, context.previousData);
                } else {
                    // For invalid structures, just invalidate to refetch fresh data
                    queryClient.invalidateQueries({ queryKey: queryKeyToUpdate, exact: false });
                }
            }
            console.error(`Error en mutación "${mutationKey}":`, _err);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyToUpdate, exact: false });
        },
    });
}
