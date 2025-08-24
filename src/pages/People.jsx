import { useUsers } from "../hooks/useUsers";
import { SearchBox } from "../components/common/SearchBox";
import UserList from "../components/user/UserList";
import FollowButton from "../components/common/FollowButton";
import "../styles/People.css";

function People() {
    const { users, followingIds, loading, error, hasMore, loadMore } = useUsers();

    if (loading && users.length === 0) return <p className="people__loading">Cargando usuarios...</p>;
    if (error) return <p className="people__error">Error al cargar usuarios.</p>;

    const FollowAction = ({ user }) => (
        <FollowButton
            targetUserId={user._id}
            isFollowing={followingIds.includes(user._id)}
        />
    );

    return (
        <div className="people-page">
            <SearchBox items={users} keys={["name", "nick"]} placeholder="Buscar usuarios...">
                {(displayUsers) => (
                    <UserList
                        users={displayUsers}
                        getSubText={(user) => user.nick}
                        actionComponent={FollowAction}
                        onUserClick={(userId) => console.log("Usuario clickeado:", userId)}
                    />
                )}
            </SearchBox>

            {hasMore && (
                <button onClick={loadMore} className="people__load-more" disabled={loading}>
                    {loading ? "Cargando..." : "Cargar más"}
                </button>
            )}
        </div>
    );
}

export default People;
