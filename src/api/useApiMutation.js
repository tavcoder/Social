import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "./apiHelper";
// Mapas de endpoints y selectores
const queryEndpointsMap = {
    follow: () => `follow/save`,
    unfollow: (targetUserId) => `follow/unfollow/${targetUserId}`,
    addComment: (postId) => `publication/${postId}/comment`,
    addPost: () =>` publication/save`,
};

const querySelectMap = {
    follow: (res) => res,
    unfollow: (res) => res,
    addComment: (res) => res,
    addPost: (res) => res,
};

// Hook genérico ultra-inteligente
export function useApiMutation(key) {
    const queryClient = useQueryClient();

    if (!queryEndpointsMap[key]) throw new Error(`No query endpoint for key "${key}"`);
    if (!querySelectMap[key]) throw new Error(`No selector for key "${key}"`);

    const endpointFn = queryEndpointsMap[key];
    const selectFn = querySelectMap[key];

    return useMutation({
        mutationFn: async ({ method = "POST", ...variables }) => {
            const endpoint = endpointFn(variables.id);
            const response = await callApi(method, endpoint, variables);
            return selectFn(response);
        },
        onMutate: async (variables) => {
            await queryClient.cancelQueries([key]);
            const previousData = queryClient.getQueryData([key]);

            // Actualización optimista automática
            queryClient.setQueryData([key], (old) => {
                if (Array.isArray(old)) {
                    // Lista → agregamos temporal
                    return [...old, { id: "temp-id", ...variables }];
                } else if (typeof old === "object" && old !== null) {
                    // Objeto → mezclamos variables
                    return { ...old, ...variables };
                } else if (typeof old === "number") {
                    // Contador → asumimos incremento
                    return old + 1;
                }
                return old;
            });

            return { previousData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData([key], context.previousData);
            }
            console.error(`Error en mutación "${key}":`, _err);
        },

        onSuccess: (data) => {
            queryClient.setQueryData([key], data);
        },

        onSettled: () => {
            queryClient.invalidateQueries([key]);
        },
    });
}
