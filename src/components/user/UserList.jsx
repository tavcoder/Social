import React from "react";
import UserRow from "../common/UserRow";

function UserList({ users, onUserClick, getSubText, actionComponent: ActionComponent }) {
    return (
        <div className="user__list">
            {users.map((user) => (
                <div
                    key={user._id}
                    className="user__list__item-wrapper"
                    onClick={() => onUserClick && onUserClick(user._id)}
                >
                    <UserRow
                        name={user.name}
                        subText={getSubText ? getSubText(user) : ""}
                        ActionComponent={ActionComponent ? <ActionComponent user={user} /> : null}
                        user={user}
                    />
                </div>
            ))}
        </div>
    );
}

export default UserList;
