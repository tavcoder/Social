import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useApiMutation from "@/api/useApiMutation";
import { useAuth } from "@/hooks/auth";

export default function FollowButton({ targetUserId, initialFollowing }) {
  const { user: authUser } = useAuth();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
console.log(initialFollowing);
  // Estado local de usuarios que sigue el authUser
  const [following, setFollowing] = useState(initialFollowing || []); 

  if (!authUser) return null;

  // Verificar si el authUser ya sigue al targetUserId
  const isFollowing = following.includes(targetUserId);

  // Mutación única para follow/unfollow
  const followMutation = useApiMutation(
    isFollowing ? "unfollow" : "follow",
    ["following", authUser._id]
  );

  const handleClick = () => {
    setIsProcessing(true);

    followMutation.mutate(
      { followed: targetUserId },
      {
        onSettled: () => {
          setIsProcessing(false);
          // opcional: invalidar query para asegurar consistencia
          queryClient.invalidateQueries(["following", authUser._id]);
        },
        onSuccess: () => {
          // Actualizar estado local
          if (isFollowing) {
            setFollowing(prev => prev.filter(id => id !== targetUserId));
          } else {
            setFollowing(prev => [...prev, targetUserId]);
          }
        },
        onError: (err) => {
          console.error("Error en follow/unfollow:", err);
        },
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      style={{
        padding: "0.5rem 1rem",
        opacity: isProcessing ? 0.6 : 1,
        cursor: isProcessing ? "not-allowed" : "pointer",
      }}
    >
      {isProcessing ? "Procesando..." : isFollowing ? "Siguiendo" : "Seguir"}
    </button>
  );
}
