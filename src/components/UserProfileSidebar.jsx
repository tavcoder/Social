import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";

export default function UserProfileSidebar() {
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    const { data: profile, isLoading: loadingProfile } = useApiQuery('profile', userId);
    const { data: counters, isLoading: loadingCounters } = useApiQuery('counters', userId);

    if (loadingProfile || loadingCounters) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (
        <div className="profile-box" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>

            <img
                src={profile.user.image || "/avatar.png"}
                alt="avatar"
                width="80"
                style={{ borderRadius: "50%", objectFit: "cover" }}
            />

            <h4>{profile.user.name}</h4>
            <p>{profile.user.nick}</p>
            <p>@{profile.user.email}</p>
            <p>{profile.user.bio}</p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <div>Siguiendo <br /><strong>{counters.following}</strong></div>
                <div>Seguidores <br /><strong>{counters.followed}</strong></div>
                <div>Publicaciones <br /><strong>{counters.publications}</strong></div>
            </div>

        </div>

    );

}


