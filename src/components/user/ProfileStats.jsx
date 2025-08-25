import { NavLink } from "react-router";

const ProfileStats = ({ counters }) => {
    return (
        <div className="profile__stats">
            <NavLink to="timeline">
                <div className="stats__counters">
                    <strong>{counters.publications}</strong>
                    <span className="stats__name">Posts</span>
                </div>
            </NavLink>
            <NavLink to="people/followers">
                <div className="stats__counters">
                    <strong>{counters.followed}</strong>
                    <span className="stats__name">Followers</span>
                </div>
            </NavLink>
            <NavLink to="people/following">
                <div className="stats__counters">
                    <strong>{counters.following}</strong>
                    <span className="stats__name">Following</span>
                </div>
            </NavLink>
        </div>
    );
};

export default ProfileStats;
