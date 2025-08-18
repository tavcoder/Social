import AddComment from "./AddComment";
import { useApiQuery } from "../../api/useApiQuery";
import UserRow from "../common/UserRow";
import "../../styles/CommentsItem.css";

export default function CommentsItem({ postId}) {
    const { data: comments = [], isLoading } = useApiQuery("comments", postId);
    console.log(comments)
    if (isLoading) return <p>Cargando comentarios...</p>;

    return (
        <div className="comments__container">
            {comments.length === 0 ? (
                <p className="comments__empty-message">No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="comment__item">
                        <UserRow
                            avatar={comment.user.image}
                            name={comment.user.name}
                            subText={comment.text}
                            targetUserId={comment.user._id}
                        />
                        <div className="comment__date">
                            {comment.created_at
                                ? new Date(comment.created_at).toLocaleString()
                                : ""}
                        </div>
                    </div>
                ))
            )}

            <AddComment postId={postId} />
        </div>
    );
}
