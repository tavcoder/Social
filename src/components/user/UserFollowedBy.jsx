import { useContext } from "react";
import { AuthContext } from "@/context";
import { useTopFollowers } from "@/hooks/users";
import { Avatar } from "@/components/common";

const UserFollowedBy = ({ user }) => {
    const { topFollowers, totalFollowers, loading } = useTopFollowers(user._id, 3);
    const { user: authUser } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    if (!topFollowers.length) return <p>No tiene seguidores</p>;

    const isFollowedByYou = topFollowers.some(f => f.user._id === authUser?.id);

    // Lista de nombres excluyendo al usuario autenticado si aplica
    const otherFollowers = topFollowers.filter(f => f.user._id !== authUser?.id);

    // Construir array final de nombres en orden
    const names = [];
    if (isFollowedByYou) names.push("you");
    otherFollowers.forEach(f => names.push(f.user.name));

    // Función para renderizar nombres con comas y 'and' antes del último
    const renderNames = (arr) => {
        if (arr.length === 1) return arr[0];
        const allButLast = arr.slice(0, -1).join(", ");
        const last = arr[arr.length - 1];
        return `${allButLast} and ${last}`;
    };

    return (
        <div className="user__followed">
            <div className="user__followed__avatars">
                {topFollowers.map(f => (
                    <Avatar
                        key={f._id}
                        src={f.user.image}
                        alt={f.user.name}
                        size={30}
                        userId={f.user._id}
                    />
                ))}
            </div>
            <div className="user__info">
                <p className="user__followed__names">
                    Followed by {renderNames(names)}
                    {totalFollowers > topFollowers.length && (
                        <span> and {totalFollowers - topFollowers.length} others</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default UserFollowedBy;
