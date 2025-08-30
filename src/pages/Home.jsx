// src/components/Home.jsx
import { useContext } from "react";
import { AuthContext } from "@/context";
import { PostList, NewPostForm  } from "@/components/post";

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