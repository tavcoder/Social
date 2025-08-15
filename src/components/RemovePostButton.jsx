// RemovePostButton.jsx
import { useApiMutation } from "../api/useApiMutation";

// El componente padre (PostList) debe pasar la clave sin el número de página.
// Por ejemplo, si la clave completa es ["userPosts", "123", 1],
// el componente padre debería pasar ["userPosts", "123"].
export default function RemovePostButton({ postId, queryKeyToUpdate }) {
    const removePostMutation = useApiMutation("removePost", queryKeyToUpdate);

    const handleDelete = async () => {
        if (!postId) {
            console.error("No se ha pasado una ID de publicación");
            return;
        }

        if (!window.confirm("¿Seguro que quieres eliminar este post?")) return;

        removePostMutation.mutate({ id: postId, method: "DELETE" });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={removePostMutation.isLoading}
            style={{
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                cursor: "pointer",
            }}
        >
            {removePostMutation.isLoading ? "Eliminando..." : "Eliminar"}
        </button>
    );
}