// Componente para mostrar estadísticas del perfil (posts, followers, following) - Props: counters (object), userId (string)
import { NavLink } from "react-router";

const ProfileStats = ({ counters, userId }) => {
    // Handle loading or undefined counters
    if (!counters) {
        return (
            <div className="profile__stats">
                <div className="stats__counters">
                    <strong>Loading...</strong>
                    <span className="stats__name">Posts</span>
                </div>
                <div className="stats__counters">
                    <strong>Loading...</strong>
                    <span className="stats__name">Followers</span>
                </div>
                <div className="stats__counters">
                    <strong>Loading...</strong>
                    <span className="stats__name">Following</span>
                </div>
            </div>
        );
    }

    return (
        <div className="profile__stats">
            <NavLink to={`timeline/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.publications || 0}</strong>
                    <span className="stats__name">Posts</span>
                </div>
            </NavLink>
            <NavLink to={`people/followers/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.followed || 0}</strong>
                    <span className="stats__name">Followers</span>
                </div>
            </NavLink>
            <NavLink to={`people/following/${userId}`}>
                <div className="stats__counters">
                    <strong>{counters.following || 0}</strong>
                    <span className="stats__name">Following</span>
                </div>
            </NavLink>
        </div>
    );
};

export default ProfileStats; 
