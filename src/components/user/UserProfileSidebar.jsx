import { useApiQuery } from "../../api/useApiQuery";
import { useProfile } from "../../hooks/useProfile";
import UserBadge from "../common/UserBadge";
import ProfileStats from "./ProfileStats";

export default function UserProfileSidebar() {
    const {authUser, profile } = useProfile();
    const { data: counters, isLoading: loadingCounters } = useApiQuery(
        "counters",
        authUser.id
    );

    if (loadingCounters) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (
        <div className="user__profile card card--hover">
            <UserBadge avatar={profile.user.image} name={profile.user.name} />
            <ProfileStats counters={counters} />
        </div>
    );
}
