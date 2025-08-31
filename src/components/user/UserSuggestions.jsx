import { useContext, useState } from "react";
import { AuthContext } from "@/context";
import { useUsers } from "@/hooks/users";
import {UserList} from "@/components/user";
import {UserFollowWrapper} from "@/components/common";

export default function UserSuggestions() {
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?.id;

    // Esperamos a que authUser exista antes de cargar los usuarios
    const { unfollowedUsers = [], followingIds = [], loading, error } = useUsers(myUserId);

    const [selectedUserId, setSelectedUserId] = useState(null);

    if (!authUser) return <p>Cargando usuario...</p>;
    if (loading && unfollowedUsers.length === 0) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar usuarios.</p>;
    if (unfollowedUsers.length === 0) return <p>No hay usuarios para mostrar.</p>;

    return (
        <UserList
            users={unfollowedUsers}
            getSubText={(user) => user.nick}
            RowComponent={(props) => (
                <UserFollowWrapper
                    key={props.user._id}
                    {...props}
                    isFollowing={followingIds.includes(props.user._id)}
                    onSelect={() => setSelectedUserId(props.user._id)}
                    selected={selectedUserId === props.user._id}
                />
            )}
        />
    );
}
