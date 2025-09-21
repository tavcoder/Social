import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { PostList, NewPostForm } from "@/components/post";

function Timeline() {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

    const finalUserId = userId || user?._id;
    const isOwnTimeline = finalUserId === user?._id;

    return (
        <div className="timeline-page">
            {isOwnTimeline && <NewPostForm />}
            <PostList userId={finalUserId} />
        </div>
    );
}

export default Timeline;
 