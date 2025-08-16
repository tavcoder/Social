// components/common/ProfileStats.jsx
const ProfileStats = ({ counters }) => {
    return (
        <div className="profile-stats">
            <div className="stats-counters">
                <strong>{counters.publications}</strong>
                <span>Posts</span>
            </div>
            <div className="stats-counters">
                <strong>{counters.followed}</strong>
                <span>Followers</span>
            </div>
            <div className="stats-counters">
                <strong>{counters.following}</strong>
                <span>Following</span>
            </div>
        </div>
    );
};

export default ProfileStats;
