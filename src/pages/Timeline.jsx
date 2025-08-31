import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { PostList } from "@/components/post";

function Timeline() {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

   const finalUserId = userId || user.id;
   /*  // Get the total number of posts from the last page
    const totalPosts = data?.pages[0]?.total || 0;

    // Check if the wall is empty after the initial load is complete
    if (totalPosts === 0) {
        return (
            <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>Your wall is ready for your ideas. Why not share a photo, an anecdote, or a thought? The community is waiting for you!</p>
            </div>
        );
    }*/
    return (
        <div className="timeline-page">
            <PostList userId={finalUserId} />
        </div>
    );
}

export default Timeline;
