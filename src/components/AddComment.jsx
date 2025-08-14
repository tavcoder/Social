import { useState } from "react";
import { useApiMutation } from "../api/useApiMutation"; // tu hook genérico

export default function AddComment({ postId }) {
  const [text, setText] = useState("");

  // Usamos el hook genérico pasando el key "addComment"
  const { mutate, isLoading } = useApiMutation("addComment");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Importante: pasamos { id: postId, text: ... } porque el hook espera "variables.id"
    mutate({ id: postId, text: text.trim() });

    setText(""); // reset input después de mutar
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <textarea
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "0.5rem" }}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        style={{ marginTop: "0.5rem" }}
      >
        {isLoading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
