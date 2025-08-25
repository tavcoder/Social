import { NavLink, useParams } from "react-router";
import { PencilLine } from "phosphor-react";
import { useApiQuery } from "../../api/useApiQuery";
import UserBadge from "../common/UserBadge";
import ActionButton from "../common/ActionButton";
import ProfileStats from "./ProfileStats";
import UserFollowedBy from "./UserFollowedBy";

export default function UserProfileSidebar() {
    const { userId } = useParams();
    const { data: profile, isLoading } = useApiQuery("profile", userId);
    if (loadingCounters) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (

        <div className="user__profile__sidebar card card--hover">
            <NavLink to="editprofile">
                <ActionButton
                    icon={<PencilLine size={15} weight="regular" />}
                    label=" edit"
                    className="profile__edit__btn btn--level2"
                />
            </NavLink>
            <div className="profile__info">
                <NavLink to="timeline">
                    <UserBadge user={profile.user} />
                </NavLink>
                <ProfileStats counters={profile.counters} />
                <UserFollowedBy following={profile.user.following} user={profile.user} />

            </div>
        </div >
    );
}
