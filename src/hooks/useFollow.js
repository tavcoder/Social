import { useQueryClient } from "@tanstack/react-query";
import useApiQuery from "@/api/useApiQuery";
import useApiMutation from "@/api/useApiMutation";
import { useAuth } from "@/hooks/auth";

/**
 * Custom hook for managing follow/unfollow functionality.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.targetUserId - The ID of the user to follow or unfollow.
 * @returns {Object} An object containing follow state and actions.
 * @returns {boolean} isFollowing - Whether the authenticated user is following the target user.
 * @returns {Function} follow - Function to follow the target user.
 * @returns {Function} unfollow - Function to unfollow the target user.
 * @returns {boolean} loading - Whether any follow/unfollow operation is in progress.
 * @returns {Error|null} error - Any error that occurred during the operations.
 */
export function useFollow({ targetUserId }) {
  const { user: authUser } = useAuth();
  const queryClient = useQueryClient();
  
  // Obtener la lista de usuarios seguidos por el usuario autenticado
  const { data: followingData, isLoading: followingLoading, error: followingError } = useApiQuery(
    "following",
    authUser?._id,
    { enabled: !!authUser?._id }
  );
  // El endpoint devuelve user_following como array de IDs
  const followingIds = followingData?.user_following || [];

  // Verificar si el targetUserId está en la lista
  const isFollowing = followingIds.includes(targetUserId);

  // Mutaciones para follow/unfollow
  const followMutation = useApiMutation("follow", ["following", authUser?._id]);
  const unfollowMutation = useApiMutation("unfollow", ["following", authUser?._id]);

  const follow = () => {
    if (!targetUserId || !authUser) return;
    followMutation.mutate(
      { followed: targetUserId },
      {
        onSuccess: () => {
          // Invalidar la query para refrescar la lista
          queryClient.invalidateQueries(["following", authUser._id]);
        },
      }
    );
  };

  const unfollow = () => {
    if (!targetUserId || !authUser) return;
    unfollowMutation.mutate(
      {targetUserId },
      {
        onSuccess: () => {
          // Invalidar la query para refrescar la lista
          queryClient.invalidateQueries(["following", authUser._id]);
        },
      }
    );
  };

  const loading = followingLoading || followMutation.isPending || unfollowMutation.isPending;
  const error = followingError || followMutation.error || unfollowMutation.error;

  return {
    isFollowing,
    follow,
    unfollow,
    loading,
    error,
  };
}