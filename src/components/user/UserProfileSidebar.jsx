import { NavLink, useParams } from "react-router";
// Componente para la barra lateral del perfil de usuario con stats y seguidores - Props: ninguna
import { PencilLine } from "phosphor-react";
import { useApiQuery } from "@/api";
import { useContext } from "react";
import { AuthContext } from "@/context";
import { UserBadge, FollowButton, ActionButton } from "@/components/common";
import { ProfileStats, UserFollowedBy } from "@/components/user";

export default function UserProfileSidebar() {
    const { userId: paramUserId } = useParams();
    const { user: authUser } = useContext(AuthContext);
    // si no hay userId en la URL, toma el del usuario autenticado
    const targetUserId = paramUserId || authUser?._id;

    const { data: profile, isLoading } = useApiQuery("profile", targetUserId, {
        enabled: !!targetUserId, // evita que haga query sin id
    });
    const { data: counters, isLoading: countersLoading, isError: countersError } = useApiQuery("counters", targetUserId, {
        enabled: !!targetUserId, // evita que haga query sin id
    });

    if (isLoading) return <div>Loading profile...</div>;
    if (!profile || !profile.user) return <div>Error loading profile.</div>;

    return (
        <div className="user__profile__sidebar card card--hover">
            {authUser?._id === targetUserId && (
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
                {authUser?._id !== targetUserId && <FollowButton />}
                {countersLoading ? (
                    <div>Loading stats...</div>
                ) : countersError ? (
                    <div>Error loading stats</div>
                ) : (
                    <ProfileStats counters={counters} userId={targetUserId} />
                )}
                <UserFollowedBy
                    following={profile.following}
                    user={profile.user || {}}
                />
            </div>
        </div>
    );
}
