/**
 * Custom hook for toggling likes on posts.
 *
 * Manages optimistic updates for like/unlike actions using React Query.
 * Checks if user has liked a post and handles the toggle mutation.
 *
 * @returns {Object} isUserLiked function, handleLikeToggle function, isLoading state.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { callApi } from "@/api/apiHelper";
import { AuthContext } from "@/context";
import { mutationEndpointsMap } from "@/api/mutationMaps";

export function useToggleLike() {
    const { user: authUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const myUserId = authUser?.id;

    // Función para comprobar si el usuario ya dio like
    const isUserLiked = (post) => {
        return Array.isArray(post.likes) && post.likes.includes(myUserId);
    };

    // Mutación de toggle like
    const toggleLikeMutation = useMutation({
        mutationFn: async (publicationId) => {
            const { method, endpoint } = mutationEndpointsMap.toggleLike(publicationId);
            return await callApi(method, endpoint);
        },
        onMutate: async (publicationId) => {
            await queryClient.cancelQueries(["publication", publicationId]);

            const previousPublication = queryClient.getQueryData(["publication", publicationId]);

            queryClient.setQueryData(["publication", publicationId], (oldData) => {
                if (!oldData) return oldData;

                const likesArray = Array.isArray(oldData.likes) ? oldData.likes : [];
                const likedIndex = likesArray.indexOf(myUserId);
                let newLikes;

                if (likedIndex === -1) {
                    newLikes = [...likesArray, myUserId];
                } else {
                    newLikes = likesArray.filter((id) => id !== myUserId);
                }

                return {
                    ...oldData,
                    likes: newLikes,
                };
            });

            return { previousPublication };
        },
        onError: (err, publicationId, context) => {
            queryClient.setQueryData(["publication", publicationId], context.previousPublication);
        },
        onSettled: (data, error, publicationId) => {
            queryClient.invalidateQueries(["publication", publicationId]);
        },
    });

    const handleLikeToggle = (publicationId) => {
        toggleLikeMutation.mutate(publicationId);
    };

    return {
        isUserLiked,
        handleLikeToggle,
        isLoading: toggleLikeMutation.isLoading,
    };
}