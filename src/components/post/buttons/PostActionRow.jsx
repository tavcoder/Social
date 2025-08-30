import { Heart, ChatCircle } from "phosphor-react";
import { useToggleLike } from "@/hooks/social";
import { ActionButton, RemoveButton } from "@/components/common";

export default function PostActionRow({ post, onCommentToggle }) {
    const { isUserLiked, handleLikeToggle } = useToggleLike();

    return (
        <div className="post__actions">
            <ActionButton
                onClick={() => handleLikeToggle(post._id)}
                icon={
                    isUserLiked(post) ? (
                        <Heart size={16} weight="fill" color="red" className="icon" />
                    ) : (
                        <Heart size={16} weight="regular" className="icon" />
                    )
                }
                count={post.likes?.length || 0}
                className="post__button"
            />
            <ActionButton
                onClick={onCommentToggle}
                icon={<ChatCircle size={16} />}
                count={post.comments?.length || 0}
                className="post__button icon"
            />

            <RemoveButton
                elementId={post._id}
                ownerId={post.user._id}
                queryKey={"userPosts"}
                resourceType="Post"
            />

        </div>

    );
}

