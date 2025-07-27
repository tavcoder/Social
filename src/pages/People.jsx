import { useState, useEffect } from "react";

function People() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Simula usuarios "registrados"
        setUsers([
            { id: 1, name: "Victor Robles", username: "@VictorWeb", avatar: "/avatar.png", following: false },
            { id: 2, name: "Ana López", username: "@anaDev", avatar: "/avatar.png", following: true },
            { id: 3, name: "Carlos Pérez", username: "@carlosUI", avatar: "/avatar.png", following: false },
        ]);
    }, []);

    const handleToggleFollow = (id) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id ? { ...user, following: !user.following } : user
            )
        );
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="people-page">
            <h2>Gente</h2>

            <input
                type="text"
                placeholder="Buscar usuarios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
            />

            {filteredUsers.map((user) => (
                <div key={user.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img src={user.avatar} width="50" alt={user.name} />
                        <div>
                            <strong>{user.name}</strong>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleToggleFollow(user.id)}
                        style={{ padding: "0.5rem 1rem", backgroundColor: user.following ? "#ccc" : "#4CAF50", color: "#fff", border: "none" }}
                    >
                        {user.following ? "Siguiendo" : "Seguir"}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default People;
