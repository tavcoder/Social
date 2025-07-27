import { useState, useEffect } from "react";
import PostList from "../components/PostList";

function Timeline() {
    const [posts, setPosts] = useState([]);
    const currentUser = "Victor Robles"; // Simulado por ahora

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const userPosts = storedPosts.filter(post => post.user === currentUser);
        setPosts(userPosts);
    }, []);

    return (
        <div className="timeline-page">
            <h2>Mi Timeline</h2>
            {posts.length > 0 ? (
                <PostList posts={posts} />
            ) : (
                <p>Aún no has publicado nada.</p>
            )}
        </div>
    );
}

export default Timeline;
