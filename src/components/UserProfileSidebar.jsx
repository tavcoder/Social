import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";

function Metric({ label, value }) {
    return (
        <div>
            {label} <br />
            <strong>{value}</strong>
        </div>
    );
}

function UserProfileSidebar() {
    const { user } = useContext(AuthContext);
    const userId = user?.id;

    // Carga todos los datos necesarios en paralelo con useApiQuery
    const profileQuery = useApiQuery("profile", userId);
    const followingQuery = useApiQuery("following", userId);
    const followersQuery = useApiQuery("followers", userId);
    const postsQuery = useApiQuery("posts", userId);

    const isLoading =
        profileQuery.isLoading ||
        followingQuery.isLoading ||
        followersQuery.isLoading ||
        postsQuery.isLoading;

    const isError = !profileQuery.data;

    if (isLoading) return <div>Cargando perfil...</div>;
    if (isError) return <div>Error al cargar el perfil.</div>;

    const { data: profile } = profileQuery;
    const { data: following } = followingQuery;
    const { data: followers } = followersQuery;
    const { data: posts } = postsQuery;

    return (
        <div
            className="profile-box"
            style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}
        >
            <img
                src={profile.image || "/avatar.png"}
                alt="avatar"
                width={80}
                style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <h4>{profile.name}</h4>
            <p>@{profile.nick}</p>
            <div
                style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}
            >
                <Metric label="Siguiendo" value={following} />
                <Metric label="Seguidores" value={followers} />
                <Metric label="Publicaciones" value={posts} />
            </div>
        </div>
    );
}

export default UserProfileSidebar;
