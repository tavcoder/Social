import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import UserList from "../user/UserList";
import FollowButton from "../common/FollowButton";

export default function UserSuggestions() {
    const { unfollowedUsers, followingIds, loading, error } = useUsers();
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?.id;

    const [selectedUserId, setSelectedUserId] = useState(null);

    if (loading && unfollowedUsers.length === 0) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar usuarios.</p>;
    if (!unfollowedUsers || unfollowedUsers.length === 0) return <p>No hay usuarios para mostrar.</p>;

    // Componente de acción para cada usuario
    const ActionComponent = ({ user }) => (
        <FollowButton targetUserId={user._id} isFollowing={followingIds.includes(user._id)} />
    );

    // Función para obtener el subText
    const getSubText = (user) => user.nick;

    // Función que maneja click en la fila
    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
        console.log("Usuario seleccionado:", userId);
    };

    return (
        <UserList
            users={unfollowedUsers}
            selectedUserId={selectedUserId}
            getSubText={getSubText}
            actionComponent={ActionComponent}
            onUserClick={handleUserClick}
        />
    );
}
