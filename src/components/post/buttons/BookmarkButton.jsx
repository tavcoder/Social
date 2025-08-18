// components/post/buttons/BookmarkButton.jsx
import { BookmarkSimple } from "phosphor-react";
import PostActionButton from "./PostActionButton";

function BookmarkButton({ count }) {
  return (
    <PostActionButton
      icon={<BookmarkSimple size={16} weight="regular" className="icon" />}
      count={count}
    />
  );
}

export default BookmarkButton;
