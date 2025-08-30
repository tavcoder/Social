import { Avatar } from "@/components/common";

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
