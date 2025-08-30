//Puede recibir targetUserId y usa useParams para filtrar por tipo (all, followers, following).
//Tiene buscador (SearchBox) y paginación (hasMore + loadMore).
import { useParams } from "react-router";
import { useUsers } from "@/hooks/users";
import { SearchBox, UserFollowWrapper  }  from "@/components/common";
import { UserList }  from "@/components/user";
import "../styles/People.css";

// Hook interno para manejar listas y placeholders según type
function usePeopleLists(type, users, followers, following) {
    const lists = {
        all: users,
        followers,
        following
    };

    const placeholders = {
        all: "Buscar usuarios...",
        followers: "Buscar seguidores...",
        following: "Buscar a quienes sigue..." 
    };

    return {
        listToDisplay: lists[type] || users,
        placeholder: placeholders[type] || "Buscar usuarios..."
    };
}

function People() {
    // 👇 Recibimos directamente type y userId de la URL
    const { type = "all", userId = null } = useParams();
    const {
        users,
        followers,
        following,
        followingIds,
        loading,
        error,
        hasMore,
        loadMore
    } = useUsers(1, 10, userId);

    // 👇 Si hay userId, solo tiene sentido mostrar followers/following
    const effectiveType = userId
        ? (type === "followers" ? "followers" : "following")
        : type;
    const { listToDisplay, placeholder } = usePeopleLists(effectiveType, users, followers, following);

    if (loading && users.length === 0) {
        return <p className="people__loading">Cargando usuarios...</p>;
    }

    if (error) {
        return <p className="people__error">Error al cargar usuarios.</p>;
    }

    return (
        <div className="people-page">
            <SearchBox
                items={listToDisplay}
                keys={["name", "nick"]}
                placeholder={placeholder}
            >
                {(displayUsers) => (
                    <UserList
                        users={displayUsers}
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
