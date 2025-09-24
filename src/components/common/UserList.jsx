import { UserRow, FollowButton } from "@/components/common";

/**
 * UserList component for displaying a list of users.
 *
 * Renders a collection of user items with optional follow buttons. Each user
 * is displayed using UserRow component, and can optionally include a FollowButton
 * for follow/unfollow actions.
 *
 * @param {Array} users - Array of user objects to display
 * @param {Function} getSubText - Function that takes a user object and returns subtext string
 * @param {boolean} [showFollowButton=false] - Whether to show follow/unfollow buttons for each user
 * @returns {JSX.Element} A div containing the list of user rows
 *
 * @example
 * <UserList
 *   users={userArray}
 *   getSubText={(user) => user.email}
 *   showFollowButton={true}
 * />
 */
export default function UserList({ users, getSubText, showFollowButton = false }) {
    return (
        <div className="user__list">
            {users.map((user) => {
                const subText = getSubText ? getSubText(user) : "";
                return (
                    <div key={user._id} className="user-row-with-follow">
                        <UserRow user={user} subText={subText} />
                        {showFollowButton && (
                            <FollowButton targetUserId={user._id} />

                        )}
                    </div>
                );
            })}
        </div>
    );
}

