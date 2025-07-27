import PostItem from "./PostItem";

function PostList() {
    const posts = [
        { id: 1, user: "Victor Robles", time: "Hace 1 hora", text: "Hola, buenos días." },
        { id: 2, user: "Victor Robles", time: "Hace 1 hora", text: "Hola, buenos días." },
        { id: 3, user: "Victor Robles", time: "Hace 1 hora", text: "Hola, buenos días." },
    ];

    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
