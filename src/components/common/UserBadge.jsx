import Avatar from "../common/Avatar"; // Ajusta la ruta según tu estructura

const UserBadge = ({ avatar, name, isOnline }) => {
  return (
    <div className="user-badge">
      <Avatar src={avatar} alt={name} size={60} isOnline={isOnline} />
      <div className="user-info">
        <p className="user-info__name">{name}</p>
        <p className="user-info__country">Breemen, Germany</p>
      </div>
    </div>
  );
};

export default UserBadge;
