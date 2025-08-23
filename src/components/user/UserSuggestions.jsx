import { useUnfollowedUsers } from "../../hooks/useUnfollowedUsers";
import UserRow from "../common/UserRow";
import FollowButton from "../common/FollowButton";

export default function UserSuggestions() {
    const { unfollowedUsers, search, setSearch, loading, error } = useUnfollowedUsers();
    const myUserId = "aquí iría tu authUser.id o lo tomas del contexto";

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar usuarios.</p>;

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar usuarios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {unfollowedUsers.map(u => (
                <div key={u._id} style={{ display: "flex", justifyContent: "space-between" }}>
                    <UserRow avatar={u.image} name={u.name} subText={u.nick} />
                    <FollowButton targetUserId={u._id} myUserId={myUserId} followingData={[]} />
                </div>
            ))}
        </div>
    );
}
