import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useApiQuery } from "../../api/useApiQuery";
import UserBadge from "../common/UserBadge";
import ProfileStats from "./ProfileStats";

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
        <div className="user__profile card card--hover">
            <UserBadge avatar={profile.user.image} name={profile.user.name} />
            <ProfileStats counters={counters} />
        </div>
    );
}
