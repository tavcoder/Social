// Componente para el botón de eliminar elementos (posts, comentarios) con confirmación - Props: postId (string), elementId (string), ownerId (string), resourceType (string), queryKey (array)
import { useProfile } from "@/hooks/users";
import { useApiMutation } from "@/api";

export default function RemoveButton({ postId, elementId, ownerId, resourceType, queryKey }) {
    const { authUser } = useProfile();
    const myUserId = authUser?.id;
    if (ownerId !== myUserId) return null;

    const queryKeyToUpdate = postId ? [queryKey, postId] : [queryKey];
    const removeMutation = useApiMutation(`remove${resourceType}`, queryKeyToUpdate);

    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar este ${resourceType}?`)) return;

        const baseVariables = resourceType === "Comment"
            ? { id: postId, commentId: elementId }
            : { id: elementId };

        const variables = { method: "DELETE", ...baseVariables };

        removeMutation.mutate(variables);

    };

    return (
        <button
            onClick={handleDelete}
            disabled={removeMutation.isLoading}
            className="btn btn--level3"
        >
            {removeMutation.isLoading ? "Deleting..." : "Delete"}
        </button>
    );
}
