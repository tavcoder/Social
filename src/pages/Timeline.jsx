import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 
import PostList from "../components/post/PostList";

function Timeline() {
    const { user } = useContext(AuthContext);

    return (
        <div className="timeline-page">
            <PostList userId={user.id} />
        </div>
    );
}

export default Timeline;
