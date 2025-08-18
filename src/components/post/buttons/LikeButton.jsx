// components/post/buttons/LikeButton.jsx
import { Heart } from "phosphor-react";
import { useToggleLike } from "../../../hooks/useToggleLike";
import PostActionButton from "./PostActionButton";

export default function LikeButton({ post }) {
  const { isUserLiked, handleLikeToggle, isLoading } = useToggleLike();

  return (
    <PostActionButton
      onClick={() => handleLikeToggle(post._id)}
      disabled={isLoading}
      icon={
        isUserLiked(post) ? (
          <Heart size={16} weight="fill" color="red" className="icon" />
        ) : (
          <Heart size={16} weight="regular" className="icon" />
        )
      }
      count={post.likes?.length || 0}
    />
  );
}

