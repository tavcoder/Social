// components/OnlineStatus.jsx
import { useOnlineStatus } from "@/hooks/users";

export default function OnlineStatus({ userId }) {
    const { isOnline, lastSeen } = useOnlineStatus(userId);

    return (
        <div className="online__status__container">
            {isOnline ? (
                <span className="online__status__dot" /> // puntito verde
            ) : (
                <div className="online__status__text">
                    <span>Last seen: </span>
                    <span>{lastSeen}</span>
                </div>
            )}
        </div>
    );
}
