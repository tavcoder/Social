// src/components/UserList.jsx
import UserRow from "../common/UserRow";

function UserList({ users, onUserClick, selectedUserId, getSubText, actionComponent }) {
    return (
        <div className="user__list">
            {users.map((user) => (
                <UserRow
                    key={user._id}
                    name={user.name}
                    subText={getSubText ? getSubText(user) : ""}
                    ActionComponent={actionComponent}
                    user={user}
                    className={`user__list__item ${selectedUserId === user._id ? "user__list__item--active" : ""}`}
                    onClick={() => onUserClick && onUserClick(user._id)}
                />
            ))}
        </div>
    );
}

export default UserList;
