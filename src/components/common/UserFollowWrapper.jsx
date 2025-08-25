import UserRow from "./UserRow";
import FollowButton from "./FollowButton";

export default function UserFollowWrapper({ user,subText, isFollowing }) {
    ("UserFollowWrapper cargado");

    return (
        <UserRow
            user={user}
            name={user.name}
            subText={subText}
            avatar={user.image}
            rightElement={
                <FollowButton targetUserId={user._id} isFollowing={isFollowing} />
            }
        />
    );
}
