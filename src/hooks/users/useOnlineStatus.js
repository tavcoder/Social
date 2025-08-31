// hooks/useOnlineStatus.js
import { useState, useEffect } from "react";

export function useOnlineStatus(userId) {
    const [isOnline, setIsOnline] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);

    useEffect(() => {
        // 🔹 Simulación: cambia estado cada 190s
        const updateStatus = () => {
            const newStatus = Math.random() > 0.5; // aleatorio
            setIsOnline(newStatus);

            if (!newStatus) {
                const now = new Date();
                const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                setLastSeen(formattedTime);
            }
        };

        updateStatus(); // inicial
        const interval = setInterval(updateStatus, 190 * 1000);

        return () => clearInterval(interval);
    }, [userId]);

    return { isOnline, lastSeen };
}
