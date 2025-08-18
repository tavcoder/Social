// src/components/UserRow.jsx
import Avatar from "./Avatar";

const UserRow = ({ avatar, name, subText, user, onClick, className = "" }) => {
(className)
  return (
    <div className={`${className} user__row`} onClick={onClick}>
      <Avatar src={avatar || user?.image} alt={name} size={40} />
      <div className="user__row__info">
        <p className="user__row__name">{name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>
      
    </div>
  );
};

export default UserRow;