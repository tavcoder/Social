import { useState } from "react";

const fakeUsers = [
    { id: 1, name: "Ana López", avatar: "/avatar.png" },
    { id: 2, name: "Carlos Pérez", avatar: "/avatar.png" },
];

const fakeConversations = {
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
    const [selectedUser, setSelectedUser] = useState(null);
    const [messageText, setMessageText] = useState("");

    const handleSend = () => {
        if (!messageText.trim() || !selectedUser) return;

        fakeConversations[selectedUser.id].push({ from: "Tú", text: messageText });
        setMessageText("");
    };

    return (
        <div style={{ display: "flex", height: "80vh", gap: "2rem" }}>
            {/* Lista de usuarios */}
            <aside style={{ flex: 1, borderRight: "1px solid #ccc", padding: "1rem" }}>
                <h2>Mensajes</h2>
                {fakeUsers.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            cursor: "pointer",
                            padding: "0.5rem 0",
                            backgroundColor: selectedUser?.id === user.id ? "#eee" : "transparent",
                        }}
                    >
                        <img src={user.avatar} width="40" />
                        <span>{user.name}</span>
                    </div>
                ))}
            </aside>

            {/* Conversación */}
            <section style={{ flex: 2, padding: "1rem" }}>
                {selectedUser ? (
                    <>
                        <h3>Conversación con {selectedUser.name}</h3>
                        <div
                            style={{
                                border: "1px solid #ddd",
                                height: "60%",
                                overflowY: "auto",
                                padding: "1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            {fakeConversations[selectedUser.id]?.map((msg, idx) => (
                                <p key={idx}><strong>{msg.from}:</strong> {msg.text}</p>
                            ))}
                        </div>

                        <textarea
                            rows={3}
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                        />

                        <button onClick={handleSend} style={{ padding: "0.5rem 1rem", backgroundColor: "green", color: "#fff" }}>
                            Enviar
                        </button>
                    </>
                ) : (
                    <p>Selecciona un chat para empezar a conversar.</p>
                )}
            </section>
        </div>
    );
}

export default Messages;
