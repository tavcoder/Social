import { useProfile } from "../../hooks/useProfile";
import { useApiMutation } from "../../api/useApiMutation";

export default function RemoveButton({ elementId, ownerId, resourceType, queryKey }) {
    const { authUser } = useProfile();
    const myUserId = authUser?.id;
    if (ownerId !== myUserId) return null;

    const  queryKeyToUpdate = [queryKey, myUserId]
    const removeMutation = useApiMutation(`remove${resourceType}`, queryKeyToUpdate);

    const handleDelete = async () => {
        if (!elementId) {
            console.error("No se ha pasado una ID de publicación");
            return;
        }

        if (!window.confirm(`¿Seguro que quieres eliminar este ${resourceType}?`)) return;

        removeMutation.mutate({ id: elementId, method: "DELETE" });
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