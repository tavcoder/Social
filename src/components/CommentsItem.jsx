
export default function CommentsItem({ comments, avatar, user}) {
   

    return (
        <div style={{ marginTop: "1rem" }}>
            {comments.length === 0 ? (
                <p style={{ fontStyle: "italic", color: "#777" }}>No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment._id}
                        style={{
                            borderTop: "1px solid #eee",
                            padding: "0.5rem 0",
                            display: "flex",
                            alignItems: "flex-start",
                        }}
                    >
                        <img
                            src={avatar || "/avatar.png"}
                            alt="avatar"
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "0.5rem",
                            }}
                        />
                        <div>
                            <strong style={{ fontSize: "0.9rem" }}>
                                {user || "Anonymous"}
                            </strong>
                            <p style={{ margin: "0.2rem 0", fontSize: "0.85rem", color: "#333" }}>
                                {comment.text}
                            </p>
                            <div style={{ fontSize: "0.75rem", color: "#999" }}>
                                {comment.created_at
                                    ? new Date(comment.created_at).toLocaleString()
                                    : ""}
                            </div>
                        </div>
                    </div>
                ))
            )}
         
        </div>
    );
}
