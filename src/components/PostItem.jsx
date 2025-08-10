import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentsItem from "./CommentsItem";
import AddComment from "./AddComment";
import { useToggleLike } from "../hooks/useToggleLike";

function PostItem({ post }) {
    const { user: authUser } = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);
    const myUserName = authUser?.name;

    const { isUserLiked, handleLikeToggle, isLoading } = useToggleLike();

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <img
                    src={post.user?.image || "/avatar.png"}
                    alt="avatar"
                    style={styles.avatar}
                />
                <div>
                    <strong>{post.user?.name || "User"}</strong>
                    <div style={styles.time}>{post.time}</div>
                </div>
            </div>

            {/* Texto del post */}
            <p style={styles.text}>{post.text}</p>

            {/* Imagen única */}
            {post.file && (
                <div style={{ marginBottom: "1rem" }}>
                    <img
                        src={
                            post.file.startsWith("http")
                                ? post.file
                                : `http://localhost:3900/api/publication/media/${post.file}`
                        }
                        alt="post-image"
                        style={styles.image}
                    />
                </div>
            )}

            {/* Reacciones */}
            <div style={styles.actions}>
                <button
                    onClick={() => setShowComments((prev) => !prev)}
                    style={styles.button}
                >
                    💬 {post.comments?.length || 0} Comments
                </button>
                <button
                    onClick={() => handleLikeToggle(post._id)}
                    disabled={isLoading}
                >
                    {isUserLiked(post) ? "💙" : "🤍"} Like ({post.likes?.length || 0})
                </button>
                <div>🔁 231 Share</div>
                <div>💾 12 Saved</div>
            </div>

            {showComments && post.comments && (
                <CommentsItem
                    comments={post.comments}
                    avatar={post.user?.image}
                    user={myUserName}
                />
            )}

            <div style={styles.commentBox}>
                <img
                    src="/avatar.png"
                    alt="avatar"
                    style={styles.smallAvatar}
                />
                <AddComment postId={post._id} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "2rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        fontFamily: "Arial, sans-serif",
    },
    header: { display: "flex", alignItems: "center", marginBottom: "1rem" },
    avatar: { width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", marginRight: "1rem" },
    time: { fontSize: "0.8rem", color: "#777" },
    text: { marginBottom: "1rem", fontSize: "0.95rem", lineHeight: "1.4" },
    image: { width: "100%", borderRadius: "8px", objectFit: "cover" },
    actions: { display: "flex", justifyContent: "space-between", color: "#555", fontSize: "0.85rem", marginBottom: "1rem" },
    button: { cursor: "pointer", background: "none", border: "none", color: "#555" },
    commentBox: { display: "flex", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "0.5rem" },
    smallAvatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", marginRight: "0.5rem" },
};

export default PostItem;
