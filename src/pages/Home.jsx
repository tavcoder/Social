// src/components/Home.jsx
import { PostList, NewPostForm  } from "@/components/post";

function Home() {

    return (
        <section>
            <NewPostForm />
            <PostList />
        </section>
    );
}

export default Home;