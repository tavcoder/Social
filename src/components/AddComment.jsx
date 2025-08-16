import { useState } from "react";
import ChatInput from "./ChatInput"; // Asegúrate de que la ruta sea correcta
import { useApiMutation } from "../api/useApiMutation"; // tu hook genérico

export default function AddComment({ postId }) {
  const [text, setText] = useState("");

  const { mutate, isLoading } = useApiMutation("addComment");

  const handleSend = () => {
    if (!text.trim()) return;

    mutate({ id: postId, text: text.trim() });
    setText(""); // Restablece la entrada después de enviar
  };

  return (
    <div className="comments">
      <ChatInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSend={handleSend}
        placeholder="Añade un comentario..."
        disabled={isLoading} // Puedes pasar esta prop al input dentro de ChatInput
      />
    </div>
  );
}