import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callApi } from "../services/fetcher"; 

export default function AddComment({ postId }) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newCommentText) => {
      return await callApi("POST", `publication/${postId}/comment`, {
        text: newCommentText,
      });
    },
    onSuccess: (newComment) => {
      // Actualizamos la cache de los comentarios de este post
      queryClient.setQueryData(["comments", postId], (old = []) => [
        ...old,
        newComment,
      ]);
      setText("");
    },
    onError: (err) => {
      console.error("Error posting comment:", err);
      alert("No se pudo enviar el comentario");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutate(text.trim());
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
