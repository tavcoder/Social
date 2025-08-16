import { useState } from "react";
import ChatInput from "../chat/ChatInput";
import UserList from "../user/UserList"; // Importa el nuevo componente
import "../../styles/Messages.css";

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

const lastSeen = "2:00 am";

function Messages() {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [conversations, setConversations] = useState(initialConversations);

    const handleSend = () => {
        if (!messageText.trim() || !selectedUserId) return;
        const newConversations = { ...conversations };
        newConversations[selectedUserId].push({ from: "Tú", text: messageText });
        setConversations(newConversations);
        setMessageText("");
    };

    const selectedUser = fakeUsers.find((user) => user.id === selectedUserId);

    return (
        <div className="chat-container-column">
            <h2 className="chat-title">Messages</h2>
            <UserList
                users={fakeUsers}
                onUserClick={setSelectedUserId}
                selectedUserId={selectedUserId}
                getSubText={(user) => {
                    const msgs = conversations[user.id] || [];
                    if (msgs.length === 0) return user.online ? "Online" : user.lastSeen || "";
                    return msgs[msgs.length - 1].text; // último mensaje
                }}
                lastSeen={lastSeen}
            />


            <section className="chat-main-section">
                {selectedUser ? (
                    <>
                        <h3 className="chat-conversation-title">Conversación con {selectedUser.name}</h3>
                        <div className="chat-messages">
                            {conversations[selectedUserId]?.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`chat-bubble ${msg.from === "Tú" ? "sent" : "received"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <ChatInput
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onSend={handleSend}
                            placeholder="Escribe un mensaje..."
                        />
                    </>
                ) : (
                    <p className="chat-placeholder">Selecciona un chat para empezar a conversar.</p>
                )}
            </section>
        </div>
    );
}

export default Messages;