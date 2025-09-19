import { useContext } from "react";
// Componente para mostrar quién sigue al usuario actual - Props: user (object)
import { AuthContext } from "@/context";
import { useTopFollowers } from "@/hooks/users";
import { Avatar } from "@/components/common";

const UserFollowedBy = ({ user}) => {
    const { topFollowers, totalFollowers, loading } = useTopFollowers(user._id, 3);
    const { user: authUser } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    if (!topFollowers.length) return <p>No tiene seguidores</p>;

    const isFollowedByYou = topFollowers.some(f => f._id === authUser?.id);
    return (
        <div className="user__followed">
            <div className="user__followed__avatars">
                {topFollowers.map(f => (
                    <Avatar
                        key={f._id}
                        src={f.image}
                        alt={f.name}
                        size={30}
                        userId={f._id}
                    />
                ))}
            </div>
            <div className="user__info">
                <p className="user__followed__names">
                    Followed by{" "}
                    {isFollowedByYou ? (
                        <>
                            <span>you and</span>
                            {topFollowers
                                .filter(f => f._id !== authUser?.id)
                                .map(f => (
                                    <span key={f._id}> , {f.name}</span>
                                ))}
                        </>
                    ) : (
                        topFollowers.map(f => (
                            <span key={f._id}>{f.name} </span>
                        ))
                    )}
                    {totalFollowers > topFollowers.length && (
                        <span> and {totalFollowers - topFollowers.length} others</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default UserFollowedBy;
