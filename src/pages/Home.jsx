// src/components/Home.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostList from "../components/post/PostList";
import NewPostForm from "../components/post/NewPostForm";

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <section>
            <h2>Hola, {user?.name}</h2>
            <h2>Timeline</h2>
            <NewPostForm />
            <PostList />
        </section>
    );
}

export default Home;