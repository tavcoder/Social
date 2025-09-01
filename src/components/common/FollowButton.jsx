export default function FollowButton({ targetUserId, isFollowing, className }) {
    return (
        <button className={className || "btn"}>
            {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
    );
}
