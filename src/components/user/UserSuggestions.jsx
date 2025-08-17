// src/components/UserSuggestions.jsx
import UserList from "./UserList";
import FollowButton from "../common/FollowButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function UserSuggestions() {
    const { user: authUser } = useContext(AuthContext);
    const myUserId = authUser?.id;

    // Datos ficticios para pruebas
    const allUsersData = [
        { _id: "1", name: "Ana Pérez", username: "ana" },
        { _id: "2", name: "Juan López", username: "juan" },
        { _id: "3", name: "María García", username: "maria" },
        { _id: "4", name: "Carlos Díaz", username: "carlos" },
        { _id: "5", name: "Laura Martínez", username: "laura" },
        { _id: "6", name: "Pedro Sánchez", username: "pedro" }
    ];

    // Filtramos para no sugerirnos a nosotros mismos
    const usersToSuggest = allUsersData.filter(user => user._id !== myUserId);

    // Wrapper para pasar el botón de seguir a UserList
    const FollowButtonWrapper = ({ user }) => (
        <FollowButton targetUserId={user._id} myUserId={myUserId} />
    );

    return (
        <div className="card card--hover">
            <h3 className="title">Sugerencias para ti</h3>
            <UserList
                users={usersToSuggest.slice(0, 5)}
                selectedUserId={null}
                showStatus={false}
                actionComponent={FollowButtonWrapper}
            />
        </div>
    );
}

export default UserSuggestions;
