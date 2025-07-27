function PostItem({ post }) {
    return (
        <div className="post-item" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src="/avatar.png" alt="avatar" width="50" />
                <div>
                    <strong>{post.user}</strong> | <span>{post.time}</span>
                </div>
            </div>
            <p style={{ marginTop: "1rem" }}>{post.text}</p>
            <button style={{ backgroundColor: "red", color: "white", border: "none", padding: "0.5rem", marginTop: "0.5rem" }}>
                🗑️ Eliminar
            </button>
        </div>
    );
}

export default PostItem;
