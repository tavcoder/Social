import {FollowButton, UserRow} from "@/components/common";

/**
 * UserFollowWrapper component
 *
 * A wrapper component that displays a user row with a follow/unfollow button.  
 * Useful for lists of users where each row includes user info and a follow action.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - The user object to display
 * @param {string} [props.subText] - Optional subtext to show below the user's name
 * @param {boolean} props.isFollowing - Whether the current user is following this user
 */

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
