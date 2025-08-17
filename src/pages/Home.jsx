// src/components/Home.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PostList from "../components/post/PostList";
import NewPostForm from "../components/post/NewPostForm";

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <section>
            <NewPostForm />
            <PostList />
        </section>
    );
}

export default Home;