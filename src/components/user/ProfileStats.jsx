// Componente para mostrar estadísticas del perfil (posts, followers, following) - Props: counters (object), userId (string)
import { NavLink } from "react-router";

const ProfileStats = ({ counters, userId }) => {
    return (
        <div className="profile__stats">
            <NavLink to={`timeline/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.publications}</strong>
                    <span className="stats__name">Posts</span>
                </div>
            </NavLink>
            <NavLink to={`people/followers/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.followed}</strong>
                    <span className="stats__name">Followers</span>
                </div>
            </NavLink>
            <NavLink to={`people/following/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.following}</strong>
                    <span className="stats__name">Following</span>
                </div>
            </NavLink>
        </div>
    );
};

export default ProfileStats; 
