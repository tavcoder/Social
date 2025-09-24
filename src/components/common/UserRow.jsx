/**
 * UserRow component
 *
 * Displays a single row for a user with avatar, name, optional subtext, and a right-side element (like a button or icon).  
 * Can handle clicks if an onClick function is provided.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - User object containing data to display
 * @param {string} [props.subText] - Optional subtext to display below the user's name
 * @param {React.ReactNode} [props.rightElement] - Optional element displayed on the right side (e.g., follow button)
 * @param {string} [props.className] - Optional additional CSS classes for the row
 * @param {function} [props.onClick] - Optional click handler for the row
 */
import {Avatar} from "@/components/common";

export default function UserRow({
  user,
  subText,
  rightElement,
  className = "",
  onClick = () => { } // valor por defecto, no hace nada si no se pasa
}) {
  if (!user) return null;
  return (
    <div className={`${className} user__row`} onClick={onClick}>
      <Avatar
        src={user?.image}
        alt={user.name}
        userId={user._id}
        size={40}
      />
      <div className="user__row__info">
        <p className="user__row__name">{user.name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>
      {rightElement && <div className="user__row__action">{rightElement}</div>}
    </div>
  );
};
