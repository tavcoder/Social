import Avatar from "../common/Avatar"; // Ajusta la ruta según tu estructura

const UserBadge = ({ user, isOnline }) => {
  return (
    <div className="user__badge">
      <Avatar src={user.image} alt={name} size={60} isOnline={isOnline} userId={user._id} />
      <div className="user__info">
        <p className="user__info__name">{user.name}</p>
        <p className="user__info__email">{user.email}</p>
        <p className="user__info__email">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserBadge;
