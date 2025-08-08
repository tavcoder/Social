import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { get } from "../services/fetcher";

function UserProfileSidebar() {
    const { user } = useContext(AuthContext);

    const userId = user?.id;

    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ["userProfile", userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await get(`user/profile/${userId}`);
            return res.user;
        }
    });

    const { data: following, isLoading: loadingFollowing } = useQuery({
        queryKey: ["userFollowing", userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await get(`follow/following/${userId}`);
            console.log("following response:", res);
            return res.total; // Ajusta según la estructura de tu respuesta
        }
    });

    const { data: followers, isLoading: loadingFollowers } = useQuery({
        queryKey: ["userFollowers", userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await get(`follow/followers/${userId}`);
            console.log("followers response:", res);
            return res.total;
        }
    });

    const { data: posts, isLoading: loadingPosts } = useQuery({
        queryKey: ["userPosts", userId],
        enabled: !!userId,
        queryFn: async () => {
            const res = await get(`publication/user/${userId}`);
            return res.total;
        }
    });

    if (loadingProfile || loadingFollowing || loadingFollowers || loadingPosts) {
        return <div>Cargando perfil...</div>;
    }

    if (!profile) return <div>Error al cargar el perfil.</div>;
console.log("avatar:",profile.image)
    return (
        <div className="profile-box" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <img
                src={profile.image || "/avatar.png"}
                alt="avatar"
                width="80"
                style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <h4>{profile.name}</h4>
            <p>@{profile.nick}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <div>Siguiendo <br /><strong>{following}</strong></div>
                <div>Seguidores <br /><strong>{followers}</strong></div>
                <div>Publicaciones <br /><strong>{posts}</strong></div>
            </div>
        </div>
    );
}

export default UserProfileSidebar;
