import Avatar from "../common/Avatar"; // Ajusta la ruta según tu estructura

const UserFollowedBy = ({ following, user }) => {
    return (
        <div className="user__followed">
            <div className="user__followed__avatars">
                <Avatar src={user.image} alt={name} size={30} className="followed__avatar" />
                <Avatar src={user.image} alt={name} size={30} className="followed__avatar" />
                <Avatar src={user.image} alt={name} size={30} className="followed__avatar" />
            </div>
            <div className="user__info">
                <p className="user__followed__names">Followed by 
                    <span> claraciudad </span>
                    and <span>18 others</span>
                </p>

            </div>
        </div>
    );
};

export default UserFollowedBy;
