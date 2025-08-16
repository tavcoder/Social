// src/components/UserList.jsx
import UserRow from "../common/UserRow";
import OnlineStatus from "../common/OnlineStatus";
import "../../styles/Messages.css";

function UserList({ users, onUserClick, selectedUserId, getSubText, actionComponent, lastSeen }) {
    return (
        <div className="chat-users-section">
            {users.map((user) => (
                <div
                    key={user.id}
                    className={`chat-user ${selectedUserId === user.id ? "active" : ""}`}
                    onClick={() => onUserClick && onUserClick(user.id)}
                >
                    <UserRow
                        name={user.name}
                        subText={getSubText ? getSubText(user) : ""}
                        isOnline={user.online}
                        ActionComponent={actionComponent}
                        user={user}
                    />
                    <OnlineStatus isOnline={user.online} lastSeen={lastSeen} />
                </div>
            ))}
        </div>
    );
}

export default UserList;
