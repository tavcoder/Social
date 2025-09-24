import { useContext } from "react";
// Componente para sugerencias de usuarios a seguir - Props: ninguna
import { AuthContext } from "@/context";
import { useUsers } from "@/hooks/userConnections";
import { UserList } from "@/components/common";

export default function UserSuggestions() {
    // Sacar todo esto a un hook?
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?._id;
    const { unfollowedUsers = [], loading, error } = useUsers(myUserId);
   


    if (!authUser) return <p>Cargando usuario...</p>;
    if (loading && unfollowedUsers.length === 0) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar usuarios.</p>;
    if (unfollowedUsers.length === 0) return <p>No hay usuarios para mostrar.</p>;

    return (
        <UserList
            users={unfollowedUsers}
            getSubText={(user) => user.nick}
            showFollowButton={true}
        />
    );
}
