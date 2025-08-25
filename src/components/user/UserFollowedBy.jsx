import Avatar from "../common/Avatar";
import { useUsers } from "../../hooks/useUsers";

const UserFollowedBy = ({ user }) => {
    // Pasamos el user._id para obtener sus seguidores
    const { followers } = useUsers(1, 10, user._id);

    // Mostrar hasta 3 avatares
    const topFollowers = followers.slice(0, 3);

    return (
        <div className="user__followed">
            <div className="user__followed__avatars">
                {topFollowers.map(f => (
                    <Avatar key={f._id} src={f.image} alt={f.name} size={30} className="followed__avatar" userId={f._id} />
                ))}
            </div>
            <div className="user__info">
                <p className="user__followed__names">
                    Followed by{" "}
                    {topFollowers.map(f => (
                        <span key={f._id}>{f.name}</span>
                    ))}
                    {followers.length > 3 && <span> and {followers.length - 3} others</span>}
                </p>
            </div>
        </div>
    );
};

export default UserFollowedBy;
