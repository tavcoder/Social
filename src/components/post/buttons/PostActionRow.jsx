import { Heart, ChatCircle } from "phosphor-react";
import { useToggleLike } from "../../../hooks/useToggleLike";
import PostActionButton from "./PostActionButton";

export default function PostActionRow({ post, onCommentToggle }) {
    const { isUserLiked, handleLikeToggle } = useToggleLike();

    return (
        <div className="post__actions">
            <PostActionButton
                onClick={() => handleLikeToggle(post._id)}
                icon={
                    isUserLiked(post) ? (
                        <Heart size={16} weight="fill" color="red" className="icon" />
                    ) : (
                        <Heart size={16} weight="regular" className="icon" />
                    )
                }
                count={post.likes?.length || 0}
            />
            <PostActionButton
                onClick={onCommentToggle}
                icon={<ChatCircle />}
                count={post.comments?.length || 0}
            />
        </div>

    );
}

