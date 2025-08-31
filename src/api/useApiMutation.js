import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/api/apiHelper";


// Endpoints dinámicos
const queryEndpointsMap = {
    login: () => `user/login`,
    register: () => `user/register`,
    follow: () => `follow/save`,
    unfollow: ({ targetUserId }) => `follow/unfollow/${targetUserId}`,
    addComment: ({ postId }) => `publication/${postId}/comment`,
    removeComment: ({ id, commentId }) => `publication/${id}/comment/${commentId}`,
    addPost: () => `publication/save`,
    removePost: ({ id }) => `publication/remove/${id}`,
    removeMessage: ({ id }) => `message/remove/${id}`,
};

// Selectores (por si quieres transformar la respuesta)
const querySelectMap = {
    login: (res) => res,
    register: (res) => res,
    follow: (res) => res,
    unfollow: (res) => res,
    addComment: (res) => res,
    removeComment: (res) => res,
    addPost: (res) => res,
    removePost: (res) => res,
    removeMessage: (res) => res,
};

// Hook genérico con optimistic update
export default function useApiMutation(mutationKey, queryKeyToUpdate) {
    const queryClient = useQueryClient();

    if (!queryEndpointsMap[mutationKey]) throw new Error(`No query endpoint for key "${mutationKey}"`);
    if (!querySelectMap[mutationKey]) throw new Error(`No selector for key "${mutationKey}"`);

    const endpointFn = queryEndpointsMap[mutationKey];
    const selectFn = querySelectMap[mutationKey];

    return useMutation({
        mutationFn: async ({ method = "POST", ...variables })  => {
            const endpoint = endpointFn(variables); // pasamos todo el objeto variables
            const response = await callApi(method, endpoint, variables);
            return selectFn(response);
        },

        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: queryKeyToUpdate, exact: false });
            const previousData = queryClient.getQueriesData({ queryKey: queryKeyToUpdate, exact: false });

            queryClient.setQueriesData({ queryKey: queryKeyToUpdate, exact: false }, (old) => {
                if (!old) return old;

                if (mutationKey === "removePost" || mutationKey === "removeComment" || mutationKey === "removeMessage") {
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
