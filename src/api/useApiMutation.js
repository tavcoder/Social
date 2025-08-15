// useApiMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "./apiHelper";

// Mapas de endpoints y selectores
const queryEndpointsMap = {
    login: () => `user/login`,
    register: () => `user/register`,
    follow: () => `follow/save`,
    unfollow: (targetUserId) => `follow/unfollow/${targetUserId}`,
    addComment: (postId) => `publication/${postId}/comment`,
    addPost: () => `publication/save`,
    removePost: (id) => `publication/remove/${id}`,
};

const querySelectMap = {
    login: (res) => res,
    register: (res) => res,
    follow: (res) => res,
    unfollow: (res) => res,
    addComment: (res) => res,
    addPost: (res) => res,
    removePost: (res) => res,
};

// Hook genérico con optimistic update
export function useApiMutation(mutationKey, queryKeyToUpdate) {
    const queryClient = useQueryClient();

    if (!queryEndpointsMap[mutationKey]) throw new Error(`No query endpoint for key "${mutationKey}"`);
    if (!querySelectMap[mutationKey]) throw new Error(`No selector for key "${mutationKey}"`);

    const endpointFn = queryEndpointsMap[mutationKey];
    const selectFn = querySelectMap[mutationKey];

    return useMutation({
        mutationFn: async ({ method = "POST", ...variables }) => {
            const endpoint = endpointFn(variables.id);
            const response = await callApi(method, endpoint, variables);
            return selectFn(response);
        },

        onMutate: async (variables) => {
            // Se cancelan las queries con el prefijo de la clave
            await queryClient.cancelQueries({ queryKey: queryKeyToUpdate, exact: false });

            // Se obtienen los datos previos usando el prefijo
            const previousData = queryClient.getQueriesData({ queryKey: queryKeyToUpdate, exact: false });

            // Actualización optimista de todos los cachés paginados
            queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, (old) => {
                if (!old) return old;
                if (mutationKey === "removePost") {
                    return {
                        ...old,
                        pages: old.pages.map(page => ({
                            ...page,
                            data: page.data.filter(post => post._id !== variables.id)
                        }))
                    };
                }
                return old;
            });

            return { previousData };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                // Se revierte la actualización optimista en caso de error
                queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, context.previousData);
            }
            console.error(`Error en mutación "${mutationKey}":`, _err);
        },

        onSuccess: () => {
            // Se invalida el caché para forzar un refetch de los datos actualizados
            queryClient.invalidateQueries({ queryKey: queryKeyToUpdate, exact: false });
        },
    });
}