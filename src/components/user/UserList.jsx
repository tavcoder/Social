
export default function UserList({ users, getSubText, RowComponent }) {
    return (
        <div className="user__list">
            {users.map((user) => (
                <RowComponent
                    key={user._id}
                    user={user}
                    subText={getSubText ? getSubText(user) : ""}

                />
            ))}
        </div>
    );
}

