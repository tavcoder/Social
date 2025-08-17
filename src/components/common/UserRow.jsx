// src/components/UserRow.jsx
import Avatar from "../common/Avatar";
import OnlineStatus from "../common/OnlineStatus";

const UserRow = ({ avatar, name, subText, ActionComponent, user, onClick, className = "" }) => {
  return (
    <div className={`user__row ${className}`} onClick={onClick}>
      <Avatar src={avatar || user?.image} alt={name} size={40} />

      <div className="user__row__info">
        <p className="user__row__name">{name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>

      {/* Solo se renderiza uno de los dos */}
      {ActionComponent ? (
        <ActionComponent user={user} />
      ) : (
        <OnlineStatus isOnline={user?.isOnline} />
      )}
    </div>
  );
};

export default UserRow;
