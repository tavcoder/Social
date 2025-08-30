import { NavLink, useParams } from "react-router";
import { PencilLine } from "phosphor-react";
import { useApiQuery } from "@/api";
import { useProfile } from "@/hooks/users";
import { UserBadge, FollowButton, ActionButton } from "@/components/common";
import { ProfileStats, UserFollowedBy } from "@/components/user";

export default function UserProfileSidebar() {
    const { userId: paramUserId } = useParams();
    const { authUser } = useProfile();
    // si no hay userId en la URL, toma el del usuario autenticado
    const targetUserId = paramUserId || authUser?.id;

    const { data: profile, isLoading } = useApiQuery("profile", targetUserId, {
        enabled: !!targetUserId, // evita que haga query sin id
    });
    const { data: counters } = useApiQuery("counters", targetUserId, {
        enabled: !!targetUserId, // evita que haga query sin id
    });

    if (isLoading) return <div>Cargando perfil...</div>;
    if (!profile) return <div>Error al cargar el perfil.</div>;

    return (
        <div className="user__profile__sidebar card card--hover">
            {authUser?.id === targetUserId && (
                <NavLink to="editprofile">
                    <ActionButton
                        icon={<PencilLine size={15} weight="regular" />}
                        label=" edit"
                        className="profile__edit__btn btn--level2"
                    />
                </NavLink>
            )}
            <div className="profile__info">
                <NavLink to={`timeline/${targetUserId}`}>
                    <UserBadge user={profile.user} />
                </NavLink>
                {authUser?.id !== targetUserId && <FollowButton />}
                <ProfileStats counters={counters} userId={targetUserId} />
                <UserFollowedBy
                    following={profile.user.following}
                    user={profile.user}
                />
            </div>
        </div>
    );
}
