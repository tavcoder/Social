import Avatar from "../common/Avatar"; // Ajusta la ruta según tu estructura

const UserBadge = ({ avatar, name, isOnline }) => {
  return (
    <div className="user__badge">
      <Avatar src={avatar} alt={name} size={60} isOnline={isOnline} />
      <div className="user__info">
        <p className="user__info__name">{name}</p>
        <p className="user__info__country">Breemen, Germany</p>
      </div>
    </div>
  );
};

export default UserBadge;
