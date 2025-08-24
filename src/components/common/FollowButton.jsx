export default function FollowButton({ targetUserId, isFollowing }) {
    return (
        <button style={{ padding: "0.5rem 1rem" }}>
            {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
    );
}
