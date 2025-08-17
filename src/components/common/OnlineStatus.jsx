import { useState, useEffect } from "react";

const OnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);

    // Función para actualizar el estado
    const updateStatus = () => {
        const newStatus = Math.random() > 0.5; // true/false aleatorio
        setIsOnline(newStatus);

        if (!newStatus) {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setLastSeen(formattedTime);
        }
    };

    useEffect(() => {
        // Actualiza el estado al montar el componente
        updateStatus();

        // Cambia el estado cada 30 minutos
        const interval = setInterval(updateStatus, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="online__status__container" >
            {isOnline ? (
                <span className="online__status__dot" />
            ) : (
                <div className="online__status__text">
                    <span>Last seen:</span>
                    <span>{lastSeen}</span>
                </div>
            )}
        </div>
    );
};

export default OnlineStatus;
