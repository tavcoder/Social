import Avatar from "../common/Avatar";
import { useTopFollowers } from "../../hooks/useTopFollowers";

const UserFollowedBy = ({ user }) => {
    const { topFollowers, totalFollowers, loading } = useTopFollowers(user._id, 3);

    if (loading) return <p>Cargando...</p>;
    if (!topFollowers.length) return <p>No tiene seguidores</p>;
console.log(topFollowers);
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
                    Followed by{" "}
                    {topFollowers.map(f => (
                        <span key={f.user._id}>{f.user.name}</span>
                    ))}
                    {totalFollowers > topFollowers.length &&
                        <span> and {totalFollowers - topFollowers.length} others</span>
                    }
                </p>
            </div>
        </div>
    );
};

export default UserFollowedBy;
