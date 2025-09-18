// Componente para el botón de seguir/dejar de seguir a un usuario - Props: targetUserId (string), isFollowing (boolean)
export default function FollowButton({ targetUserId, isFollowing }) {
    return (
        <button style={{ padding: "0.5rem 1rem" }}>
            {isFollowing ? "Siguiendo" : "Seguir"}
        </button>
    );
}