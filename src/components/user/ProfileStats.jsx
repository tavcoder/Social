// components/common/ProfileStats.jsx
const ProfileStats = ({ counters }) => {
    return (
        <div className="profile__stats">
            <div className="stats__counters">
                <strong>{counters.publications}</strong>
                <span className="stats__name">Posts</span>
            </div>
            <div className="stats__counters">
                <strong>{counters.followed}</strong>
                <span className="stats__name">Followers</span>
            </div>
            <div className="stats__counters">
                <strong>{counters.following}</strong>
                <span className="stats__name">Following</span>
            </div>
        </div>
    );
};

export default ProfileStats;
