import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/api/apiHelper";
import { mutationEndpointsMap, mutationMethodMap, mutationSelectMap } from "@/api/mutationMaps";

// Hook genérico con optimistic update
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
                queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, context.previousData);
            }
            console.error(`Error en mutación "${mutationKey}":`, _err);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeyToUpdate, exact: false });
        },
    });
}
