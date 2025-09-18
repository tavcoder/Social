import { format } from "date-fns";
// Componente para mostrar un item de post con imagen, acciones y comentarios - Props: post (object)
import { UserRow} from "@/components/common";
import { PostImage, PostActionRow, CommentsItem} from "@/components/post";
import { useProfile } from "@/hooks/users";
import { useComments } from "@/hooks/social";

function PostItem({ post }) {
    const { showComments, handleCommentToggle } = useComments();
    const { authUser } = useProfile();
    const myUserName = authUser?.name;
    const formattedDate = format(new Date(post.created_at), "d MMM 'at' H:mm");

    // Forzar error para probar Error Boundary si el texto contiene 'error'
    if (post.text && post.text.toLowerCase().includes('error')) {
        throw new Error('Error forzado para probar Error Boundary');
    }

    return (
        <div className="post__item card">
            <UserRow
                user={post.user}
                subText={formattedDate}
                className={`post__header`}
            />
            <p className="post__text">{post.text}</p>

            <PostImage file={post.file} />
            <PostActionRow post={post} user={myUserName} onCommentToggle={handleCommentToggle} />

            {showComments && post.comments && (
                <CommentsItem postId={post._id} />
            )}
        </div>
    );
}

export default PostItem;