// components/post/buttons/PostActionButton.jsx
export default function PostActionButton({ onClick, disabled, icon, count }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="post__button icon"
    >
      {icon}
      {count > 0 && <span>{count}</span>}
    </button>
  );
}


