// components/post/buttons/CommentButton.jsx
import { ChatCircle } from "phosphor-react";
import PostActionButton from "./PostActionButton";

export default function CommentButton({ count, onClick }) {
  return (
    <PostActionButton
      onClick={onClick}
      icon={<ChatCircle size={16} weight="regular" className="icon" />}
      count={count}
    />
  );
}

