import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { PostList } from "@/components/post";

function Timeline() {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();

    const finalUserId = userId || user.id;
    return (
        <div className="timeline-page">
            <PostList userId={finalUserId} />
        </div>
    );
}

export default Timeline;
 