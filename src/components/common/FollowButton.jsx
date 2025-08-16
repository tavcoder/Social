import { useApiMutation } from "../../api/useApiMutation";

export default function FollowButton({ targetUserId, followingData }) {
    const isFollowing = followingData?.user_following?.includes(targetUserId);

    // Mutación para seguir
    const followMutation = useApiMutation("follow");

    // Mutación para dejar de seguir
    const unfollowMutation = useApiMutation("unfollow");

    const handleClick = () => {
        if (isFollowing) {
            // Mutación DELETE
            unfollowMutation.mutate({ id: targetUserId, method: "DELETE" });
        } else {
            // Mutación POST
            followMutation.mutate({ followed: targetUserId });
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
