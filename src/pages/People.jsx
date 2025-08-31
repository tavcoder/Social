import { useParams } from "react-router";
import { useUsers } from "@/hooks/users";
import { SearchBox, UserFollowWrapper } from "@/components/common";
import { UserList } from "@/components/user";
import { usePeopleLists } from "@/hooks/users";
import "../styles/People.css";

function People() {
    const { type, userId } = useParams();
    const {
        users,
        followers,
        following,
        followingIds,
        loading,
        error,
        hasMore,
        loadMore
    } = useUsers(userId, 1);

    const { listToDisplay, placeholder } = usePeopleLists(
        type,
        userId,
        users,
        followers,
        following
    );
    console.log("type",type);
    console.log("userId",userId);
    console.log("users",users);
    console.log("followers",followers);
    console.log("following",following);

    if (loading && users.length === 0) return <p className="people__loading">Cargando usuarios...</p>;
    if (error) return <p className="people__error">Error al cargar usuarios.</p>;

    return (
        <div className="people-page">
            <SearchBox
                items={listToDisplay}
                keys={["name", "nick"]}
                placeholder={placeholder}
            >
                {(listToDisplay) => (
                    <UserList
                        users={listToDisplay}
                        getSubText={(user) => user.nick}
                        RowComponent={(props) => (
                            <UserFollowWrapper
                                {...props}
                                isFollowing={followingIds}
                            />
                        )}
                    />
                )}
            </SearchBox>

            {hasMore && (
                <button
                    onClick={loadMore}
                    className="people__load-more"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Cargar más"}
                </button>
            )}
        </div>
    );
}

export default People;
