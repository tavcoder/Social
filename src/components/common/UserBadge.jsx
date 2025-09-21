import { Avatar } from "@/components/common";
/**
 * UserBadge component
 *
 * Displays a badge with the user's avatar and basic information (name, email, bio).  
 * Uses the Avatar component for the user's profile picture.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - The user object containing info to display
 * @param {string} props.user._id - The user's unique ID
 * @param {string} props.user.name - The user's full name
 * @param {string} props.user.email - The user's email address
 * @param {string} props.user.bio - The user's biography or description
 * @param {string} props.user.image - URL or identifier for the user's avatar
 */
const UserBadge = ({ user }) => {
  return (
    <div className="user__badge">
      <Avatar
        src={user.image}
        alt={user.name}
        size={60}
        userId={user._id} />
      <div className="user__info">
        <p className="user__info__name">{user.name}</p>
        <p className="user__info__email">{user.email}</p>
        <p className="user__info__email">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserBadge;
