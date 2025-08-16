import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";
import FollowButton from "../components/common/FollowButton";
import UserRow from "../components/common/UserRow";

function People() {
    const { user: authUser } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [page] = useState(1);

    const myUserId = authUser?.id;

    const { data: allUsersDataRaw = [], isLoading: allUsersLoading, isError: allUsersError } =
        useApiQuery('allUsersData', page);

    const { data: followingData, isLoading, isError } =
        useApiQuery('followingPage', { userId: myUserId, page: 1 }, { enabled: !!myUserId });

    if (isLoading || allUsersLoading) return <p>Cargando usuarios...</p>;
    if (isError || allUsersError) return <p>Error al cargar usuarios.</p>;

    const allUsersData = allUsersDataRaw.filter(user => user._id !== myUserId);

    const filteredUsers = allUsersData.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.nick.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="people-page">
            <h2>Gente</h2>

            <input
                type="text"
                placeholder="Buscar usuarios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
            />

            {filteredUsers.map((u) => (
                <div
                    key={u._id}
                    style={{
                        borderBottom: "1px solid #ccc",
                        padding: "1rem 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <UserRow avatar={u.image} name={u.name} subText={u.nick}/>
                    <FollowButton
                        targetUserId={u._id}
                        myUserId={myUserId}
                        followingData={followingData}
                    />
                </div>
            ))}
        </div>
    );
}

export default People;
