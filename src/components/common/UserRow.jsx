// src/components/UserRow.jsx
import Avatar from "../common/Avatar"; // Ajusta la ruta según tu estructura

const UserRow = ({ avatar, name, subText, isOnline, ActionComponent, user }) => (
  <div className="user-row">
    <Avatar src={avatar} alt={name} size={50} isOnline={isOnline} />
    <div className="user-row__info">
      <p className="user-row__name">{name}</p>
      <p className="user-row__subtext">{subText}</p>
    </div>
    {ActionComponent && <ActionComponent user={user} />}
  </div>
);

export default UserRow;
