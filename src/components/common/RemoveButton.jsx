// Componente para el botón de eliminar elementos (posts, comentarios) con confirmación - Props: postId (string), elementId (string), ownerId (string), resourceType (string), queryKey (array)
import { useContext } from "react";
import { AuthContext } from "@/context";
import { useApiMutation } from "@/api";

export default function RemoveButton({ postId, elementId, ownerId, resourceType, queryKey }) {
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?._id;
    if (ownerId !== myUserId) return null;

    const queryKeyToUpdate = postId ? [queryKey, postId] : [queryKey];
    const mutationKey = resourceType === "Comment" ? "removeComment" : "deletePublication";
    const removeMutation = useApiMutation(mutationKey, queryKeyToUpdate);

    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que quieres eliminar este ${resourceType}?`)) return;

        const baseVariables = resourceType === "Comment"
            ? { id: postId, commentId: elementId }
            : { id: elementId };

        const variables = baseVariables;

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
