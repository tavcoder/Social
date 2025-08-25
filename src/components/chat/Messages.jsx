import { useState } from "react";
import TextInput from "../common/TextInput";

const fakeUsers = [
    { id: 1, name: "Ana López", nick: "anita", avatar: "/avatar.png", online: true },
    { id: 2, name: "Carlos Pérez", nick: "carlosp", avatar: "/avatar.png", online: false, lastSeen: "5 min" },
];

const initialConversations = {
    1: [
        { from: "Ana López", text: "¡Hola!" },
        { from: "Tú", text: "¡Hola Ana! ¿Qué tal?" },
    ],
    2: [
        { from: "Carlos Pérez", text: "¿Vas a la reunión mañana?" },
        { from: "Tú", text: "Sí, ahí estaré." },
    ],
};

function Messages() {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [conversations, setConversations] = useState(initialConversations);

    const handleSend = () => {
        if (!messageText.trim() || !selectedUserId) return;
        const newConversations = { ...conversations };
        if (!newConversations[selectedUserId]) newConversations[selectedUserId] = [];
        newConversations[selectedUserId].push({ from: "Tú", text: messageText });
        setConversations(newConversations);
        setMessageText("");
    };

    const selectedUser = fakeUsers.find((user) => user.id === selectedUserId);

    return (
        <div className="chat__container__column card">
            <h2 className="title">Messages</h2>

            <div className="user__list">
                {fakeUsers.map((user) => {
                    const lastMsgs = conversations[user.id] || [];
                    const subText =
                        lastMsgs.length === 0
                            ? user.online
                                ? "Online"
                                : user.lastSeen || ""
                            : lastMsgs[lastMsgs.length - 1].text;

                    return (
                        <div
                            key={user.id}
                            className={`user__list__item-wrapper ${selectedUserId === user.id ? "selected" : ""}`}
                            onClick={() => setSelectedUserId(user.id)}
                        >
                            <div className="user__row">
                                <img src={user.avatar} alt={user.name} width={40} height={40} />
                                <div className="user__row__info">
                                    <p>{user.name}</p>
                                    <p>{subText}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <section className="chat__main__section">
                {selectedUser ? (
                    <>
                        <h3 className="chat__conversation__title">Conversación con {selectedUser.name}</h3>
                        <div className="chat__messages">
                            {conversations[selectedUserId]?.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`chat__bubble ${msg.from === "Tú" ? "sent" : "received"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <TextInput
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onSend={handleSend}
                            placeholder="Escribe un mensaje..."
                        />
                    </>
                ) : (
                    <p className="chat__placeholder">Selecciona un chat para empezar a conversar.</p>
                )}
            </section>
        </div>
    );
}

export default Messages;
