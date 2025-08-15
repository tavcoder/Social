import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";
import "../styles/userProfile.css";

export default function UserProfileSidebar() {
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    const { data: profile, isLoading: loadingProfile } = useApiQuery(
        "profile",
        userId
    );
    const { data: counters, isLoading: loadingCounters } = useApiQuery(
        "counters",
        userId
    );

    if (loadingProfile || loadingCounters) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (
        <div className="profile-card">
            {/* Portada */}
            <div className="cover-image">
                <img
                    src={profile.user.cover || "/cover-placeholder.jpg"}
                    alt="Cover"
                />
            </div>

            {/* Avatar */}
            <div className="avatar-wrapper">
                <img
                    src={profile.user.image || "/avatar.png"}
                    alt="avatar"
                    className="avatar"
                />
            </div>

            {/* Nombre y usuario */}
            <div className="profile-info">
                <h3>{profile.user.name}</h3>
                <p className="username">@{profile.user.nick}</p>
            </div>

            {/* Contadores */}
            <div className="profile-stats">
                <div>
                    <strong>{counters.publications}</strong>
                    <span>Post</span>
                </div>
                <div>
                    <strong>{counters.followed}</strong>
                    <span>Followers</span>
                </div>
                <div>
                    <strong>{counters.following}</strong>
                    <span>Following</span>
                </div>
            </div>

            {/* Botón */}
            <button className="profile-button">My Profile</button>
        </div>
    );
}
