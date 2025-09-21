/**
 * Timeline Page Component
 *
 * Displays a user's timeline/posts. Shows the new post form only when
 * viewing the current user's own timeline. Can display any user's
 * timeline by passing userId in the URL params.
 */
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { PostList, NewPostForm } from "@/components/post";

/**
 * Timeline component - User-specific post feed
 *
 * @returns {JSX.Element} Timeline page with conditional post creation form
 */
function Timeline() {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

    // Use URL param userId or default to current user
    const finalUserId = userId || user?._id;
    // Check if viewing own timeline to show post creation form
    const isOwnTimeline = finalUserId === user?._id;

    return (
        <div className="timeline-page">
            {/* Only show new post form on user's own timeline */}
            {isOwnTimeline && <NewPostForm />}
            {/* Display posts for the specified user */}
            <PostList userId={finalUserId} />
        </div>
    );
}

export default Timeline;
  