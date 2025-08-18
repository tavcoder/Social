// src/components/PostItem.jsx
import { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import UserRow from "../common/UserRow";
import RemovePostButton from "../post/RemovePostButton";
import PostActionRow from "./buttons/PostActionRow";
import CommentsItem from "./CommentsItem";
import { useComments } from "../../hooks/useComments";

function PostItem({ post }) {
    const { showComments, handleCommentToggle } = useComments();
    const { user: authUser } = useContext(AuthContext);
    const myUserName = authUser?.name;
    const myUserId = authUser?.id;
    const targetUserId = post?.user._id;
    console.log(targetUserId);
    const canRemove = targetUserId === myUserId;

    const formattedDate = format(new Date(post.created_at), "d MMM 'at' H:mm");
    return (
        <div className="post__item card">
            <div className="post__item__header">
                <UserRow
                    avatar={post.user.image}
                    name={post.user.name}
                    subtext={formattedDate}

                />
                {canRemove && (
                    <RemovePostButton targetUserId={targetUserId} myUserId={myUserId} />
                )}
            </div>

            <p className="post__text">{post.text}</p>

            {post.file?.trim() && (
                <div className="post__image__wrapper">
                    <img
                        src={
                            post.file.startsWith("http")
                                ? post.file
                                : `http://localhost:3900/api/publication/media/${post.file}`
                        }
                        alt="post-image"
                        className="post__image"
                    />
                </div>
            )}
            <PostActionRow post={post} user={myUserName} onCommentToggle={handleCommentToggle} />

            {showComments && post.comments && (
                <CommentsItem postId={post._id} />
            )}
        </div>
    );
}

export default PostItem;