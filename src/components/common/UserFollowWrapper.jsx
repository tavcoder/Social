import {FollowButton, UserRow} from "@/components/common";

// Componente wrapper para filas de usuario con botón de seguir - Props: user (object), subText (string), isFollowing (boolean)
export default function UserFollowWrapper({ user, subText, isFollowing }) {
    ("UserFollowWrapper cargado");

    return (
        <UserRow
            user={user}
            subText={subText}
            rightElement={
                <FollowButton targetUserId={user._id} isFollowing={isFollowing} />
            }
        />
    );
}
