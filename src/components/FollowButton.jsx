import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "../api/apiHelper";

export default function FollowButton({ targetUserId, myUserId, followingData }) {
    const queryClient = useQueryClient();

    const isFollowing = followingData?.user_following?.includes(targetUserId);

    const followMutation = useMutation({
        mutationFn: () => callApi("POST", `follow/save`, { followed: targetUserId }),
        onMutate: async () => {
            await queryClient.cancelQueries(['following', myUserId]);
            const previousFollowing = queryClient.getQueryData(['following', myUserId]);

            queryClient.setQueryData(['following', myUserId], oldData => ({
                ...oldData,
                user_following: [...(oldData?.user_following || []), targetUserId]
            }));

            return { previousFollowing };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['following', myUserId], context.previousFollowing);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['following', myUserId]);
        }
    });

    const unfollowMutation = useMutation({
        mutationFn: () => callApi("DELETE", `follow/unfollow/${targetUserId}`),
        onMutate: async () => {
            await queryClient.cancelQueries(['following', myUserId]);
            const previousFollowing = queryClient.getQueryData(['following', myUserId]);

            queryClient.setQueryData(['following', myUserId], oldData => ({
                ...oldData,
                user_following: (oldData?.user_following || []).filter(id => id !== targetUserId)
            }));

            return { previousFollowing };
        },
        onError: (_err, _vars, context) => {
            queryClient.setQueryData(['following', myUserId], context.previousFollowing);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['following', myUserId]);
        }
    });

    const handleClick = () => {
        if (isFollowing) {
            unfollowMutation.mutate();
        } else {
            followMutation.mutate();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={followMutation.isLoading || unfollowMutation.isLoading}
            style={{
                backgroundColor: isFollowing ? 'red' : 'green',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
        </button>
    );
}
