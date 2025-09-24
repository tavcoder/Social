import { useFollow } from "@/hooks/useFollow";

/**
 * Component that renders a follow or unfollow button based on the current follow status.
 *
 * @param {Object} props - The component props.
 * @param {string} props.targetUserId - The ID of the user to follow or unfollow.
 * @returns {JSX.Element|null} The follow/unfollow button or null if user is not authenticated.
 */
export default function FollowButton({ targetUserId }) {
  const { isFollowing, follow, unfollow, loading } = useFollow({ targetUserId });

    return (
    <>
       {isFollowing ? (
        <button
          onClick={unfollow}
          disabled={loading}
          className="unfollow-btn"
        >
          {loading ? "Procesando..." : "Unfollow"}
        </button>
      ) : (
        <button
          onClick={follow}
          disabled={loading}
          className="follow-btn"
        >
          {loading ? "Procesando..." : "Follow"}
        </button>
      )}
    </>
  );
}
