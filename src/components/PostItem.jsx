function PostItem({ post }) {
    console.log("post:", post.file);
    return (
        <div style={{
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            fontFamily: "Arial, sans-serif"
        }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <img
                    src={post.user.image || "/avatar.png"}
                    alt="avatar"
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", marginRight: "1rem" }}
                />
                <div>
                    <strong>{post.user.name}</strong>
                    <div style={{ fontSize: "0.8rem", color: "#777" }}>{post.time}</div>
                </div>
            </div>

            {/* Texto del post */}
            <p style={{ marginBottom: "1rem", fontSize: "0.95rem", lineHeight: "1.4" }}>{post.text}</p>

            {/* Imagen única */}
            {post.file && (
                <div style={{ marginBottom: "1rem" }}>
                    <img
                        src={
                            post.file.startsWith('http')
                                ? post.file
                                : `http://localhost:3900/api/publication/media/${post.file}`
                        }
                        alt="post-image"
                        style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
                    />
                </div>
            )}

            {/* Reacciones */}
            <div style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: "0.85rem", marginBottom: "1rem" }}>
                <div>💬 25 Comments</div>
                <div>❤️ 120k Likes</div>
                <div>🔁 231 Share</div>
                <div>💾 12 Saved</div>
            </div>

            {/* Caja de comentario */}
            <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "0.5rem" }}>
                <img
                    src="/avatar.png"
                    alt="avatar"
                    style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", marginRight: "0.5rem" }}
                />
                <input
                    type="text"
                    placeholder="Write your comment..."
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        padding: "0.5rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#f5f5f5",
                        borderRadius: "20px"
                    }}
                />
            </div>
        </div>
    );
}

export default PostItem;
