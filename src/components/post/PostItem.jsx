import { format } from "date-fns";
import { useProfile } from "../../hooks/useProfile";
import UserRow from "../common/UserRow";
import PostImage from "./PostImage";
import PostActionRow from "./buttons/PostActionRow";
import CommentsItem from "./CommentsItem";
import { useComments } from "../../hooks/useComments";

function PostItem({ post }) {
    const { showComments, handleCommentToggle } = useComments();
    const { authUser } = useProfile();
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