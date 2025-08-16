// src/components/UserSuggestions.jsx
import UserList from "./UserList";
import FollowButton from "../common/FollowButton"; // Asume que este componente existe
import { useApiQuery } from "../../api/useApiQuery";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function UserSuggestions() {
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?.id;

    const { data: allUsersData = [], isLoading, isError } = useApiQuery('allUsersData');

    if (isLoading) return <p>Cargando sugerencias...</p>;
    if (isError) return <p>No se pueden cargar las sugerencias.</p>;

    const usersToSuggest = allUsersData.filter(user => user._id !== myUserId);

    // Creamos un componente wrapper para pasar a UserList
    const FollowButtonWrapper = ({ user }) => (
        <FollowButton targetUserId={user._id} myUserId={myUserId} />
    );

    return (
        <div className="user-suggestions-container card">
            <h3>Sugerencias para ti</h3>
            <UserList
                users={usersToSuggest.slice(0, 5)}
                onUserClick={null} // No se puede hacer clic en las sugerencias
                selectedUserId={null}
                showStatus={false} // No se necesita el estado de conexión
                actionComponent={FollowButtonWrapper} // Pasamos el componente de acción
            />
        </div>
    );
}

export default UserSuggestions;