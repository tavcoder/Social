
// Componente para listar usuarios con subtexto y componente de fila personalizado
//  - Props: users (array), getSubText (function), RowComponent (component)
export default function UserList({ users, getSubText, RowComponent }) {
    return (
        <div className="user__list">
            {users.map((user) => {
                const subText = getSubText ? getSubText(user) : "";
                return (
                    <RowComponent
                        key={user._id}
                        user={user}
                        subText={subText}
                    />
                );
            })}
        </div>
    );
}

