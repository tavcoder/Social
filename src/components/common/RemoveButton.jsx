// Componente para el botón de eliminar elementos (posts, comentarios) con confirmación - Props: postId (string), elementId (string), ownerId (string), resourceType (string), queryKey (array)
import { useContext } from "react";
import { AuthContext } from "@/context";
import { useApiMutation } from "@/api";

/**
 * RemoveButton component
 *
 * Renders a delete button for posts or comments with confirmation prompt.  
 * Only visible if the authenticated user is the owner of the element.  
 * Uses a mutation hook to perform the deletion and automatically updates cache based on `queryKey`.
 *
 * @component
 * @param {Object} props
 * @param {string} props.postId - The ID of the post (required if deleting a comment)
 * @param {string} props.elementId - The ID of the element to delete (post or comment)
 * @param {string} props.ownerId - The ID of the owner of the element (used to restrict delete access)
 * @param {string} props.resourceType - The type of resource ("Post" or "Comment")
 * @param {Array} props.queryKey - The React Query cache key to invalidate/update after deletion
 */
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
