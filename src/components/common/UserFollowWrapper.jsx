import {FollowButton, UserRow} from "@/components/common";

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
