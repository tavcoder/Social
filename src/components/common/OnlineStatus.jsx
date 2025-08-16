const OnlineStatus = ({ isOnline, lastSeen }) => (
    <div className="online-status" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isOnline ? (
            <span
                className="online-status__dot"
                style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "limegreen",
                    marginTop: "4px",
                }}
            />
        ) : (
            <span className="online-status__text">{lastSeen}</span>
        )}
    </div>
);

export default OnlineStatus;
