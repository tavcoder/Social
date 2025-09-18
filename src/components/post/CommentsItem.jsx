import AddComment from "./AddComment";
// Componente para mostrar la lista de comentarios de un post - Props: postId (string)
import { useApiQuery } from "@/api";
import { UserRow, RemoveButton} from "@/components/common";
import "../../styles/CommentsItem.css";

export default function CommentsItem({ postId }) {

    const { data: comments = [], isLoading } = useApiQuery("comments", postId);
    if (isLoading) return <p>Cargando comentarios...</p>;

    return (
        <div className="comments__container">
            {comments.length === 0 ? (
                <p className="comments__empty-message">No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="comment__item">
                        <UserRow
                            user={comment.user}
                            subText={comment.text}
                            className={`comment__header`}
                        />
                        <div className="comment__date">
                            {comment.created_at
                                ? new Date(comment.created_at).toLocaleString()
                                : ""}
                        </div>
                        <RemoveButton
                            resourceType="Comment"
                            postId={postId}
                            elementId={comment._id}
                            ownerId={comment.user._id}
                            queryKey={"Comments"}
                        />
                    </div>
                ))
            )}

            <AddComment postId={postId} />
        </div>
    );
}
