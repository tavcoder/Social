// components/post/buttons/PostActionButton.jsx
export default function PostActionButton({ onClick, icon, count }) {
  return (
    <button
      onClick={onClick}
      className="post__button icon"
    >
      {icon}
      {count > 0 && <span>{count}</span>}
    </button>
  );
}


