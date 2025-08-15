import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ejemplo de tu contexto
import PostList from "../components/PostList";

function Timeline() {
    const { user } = useContext(AuthContext);

    return (
        <div className="timeline-page">
            <h2>Mi Timeline</h2>
            <PostList userId={user.id} />
        </div>
    );
}

export default Timeline;
