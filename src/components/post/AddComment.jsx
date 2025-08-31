import { useState} from "react";
import { TextInput} from "@/components/common";
import { useApiMutation } from "@/api";

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
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSend={handleSend}
        placeholder="Añade un comentario..."
        disabled={isLoading} // Puedes pasar esta prop al input dentro de ChatInput
      />
    </div>
  );
}