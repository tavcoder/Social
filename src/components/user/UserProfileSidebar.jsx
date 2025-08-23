import { NavLink } from "react-router";
import { PencilLine } from "phosphor-react";
import { useApiQuery } from "../../api/useApiQuery";
import { useProfile } from "../../hooks/useProfile";
import UserBadge from "../common/UserBadge";
import ActionButton from "../common/ActionButton";
import ProfileStats from "./ProfileStats";
import UserFollowedBy from "./UserFollowedBy";

export default function UserProfileSidebar() {
    const { authUser, profile } = useProfile();
    const { data: counters, isLoading: loadingCounters } = useApiQuery(
        "counters",
        authUser.id
    );
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
            <NavLink to="timeline">
                <div className="profile__info">
                    <UserBadge user={profile.user} />
                    <ProfileStats counters={counters} />
                    <UserFollowedBy following={profile.user.following} user={profile.user} />

                </div>
            </NavLink>
        </div >
    );
}
