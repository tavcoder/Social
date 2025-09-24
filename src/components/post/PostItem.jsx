import { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "@/context";
import { useComments } from "@/hooks/social";
import { PostImage, PostActionRow, CommentsItem} from "@/components/post";
import { UserRow} from "@/components/common";

// Componente para mostrar un item de post con imagen, acciones y comentarios - Props: post (object)

function PostItem({ post }) {
    const { showComments, handleCommentToggle } = useComments();
    const { user: authUser } = useContext(AuthContext);
    const myUserName = authUser?.name;
    const formattedDate = format(new Date(post.created_at), "d MMM 'at' H:mm");



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