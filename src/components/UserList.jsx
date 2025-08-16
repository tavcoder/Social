// src/components/UserList.jsx
import "../styles/Messages.css"; // Reutilizamos los estilos existentes

function UserList({ users, onUserClick, selectedUserId, showStatus, actionComponent: ActionComponent }) {
    return (
        <div className="chat-users-section">
            {users.map((user) => (
                <div
                    key={user.id}
                    className={`chat-user ${selectedUserId === user.id ? "active" : ""}`}
                    onClick={() => onUserClick && onUserClick(user.id)}
                >
                    <img src={user.avatar} alt={user.name} className="chat-avatar" />
                    <div className="chat-user-info">
                        <div>
                            <span>{user.name}</span>
                            <p className="user-nick">@{user.nick}</p>
                        </div>
                        <div className="user-status-and-action">
                            {showStatus && (
                                user.online ? (
                                    <span className="status-dot online"></span>
                                ) : (
                                    <span className="status-text">{user.lastSeen}</span>
                                )
                            )}
                            {ActionComponent && <ActionComponent user={user} />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UserList;