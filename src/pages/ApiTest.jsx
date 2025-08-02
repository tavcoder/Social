import React, { useState } from "react";
import { get, callApi } from "../services/fetcher";

export default function ApiTest() {
    const [name, setName] = useState("Tania");
    const [surName, setSurName] = useState("Arteaga");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerResponse, setRegisterResponse] = useState(null);
    const [testResponse, setTestResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try {
            const res = await callApi("POST", "user/register", {
                name,
                surName,
                nick,
                email,
                password,
            });

            if (res.user) {
                setRegisterResponse(res);
                setError(null);
            } else {
                throw new Error(res.message || "Registro fallido");
            }
        } catch (err) {
            console.error("Error en registro:", err);
            setError(err.message || "Error desconocido en registro");
        }
    };

    const handleTestApi = async () => {
        try {
            const res = await get("user/prueba-usuario");
            setTestResponse(res);
            setError(null);
        } catch (err) {
            console.error("Error en prueba-usuario:", err);
            setError(err.message || "Error desconocido en prueba");
        }
    };

    return (
        <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
            <h2>Registro de Usuario</h2>

            <div style={{ marginBottom: "1rem" }}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <br />
                <label>
                    Apellido:
                    <input
                        type="text"
                        value={surName}
                        onChange={(e) => setSurName(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <br />
                <label>
                    Nick:
                    <input
                        type="text"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginLeft: "0.5rem" }}
                    />
                </label>
                <br />
                <button onClick={handleRegister}>Registrarse</button>
            </div>

            {registerResponse && (
                <div style={{ marginBottom: "1rem" }}>
                    <h3>Respuesta Registro:</h3>
                    <pre>{JSON.stringify(registerResponse, null, 2)}</pre>
                    <button onClick={handleTestApi}>Probar /prueba-usuario</button>
                </div>
            )}

            {testResponse && (
                <div>
                    <h3>Respuesta de prueba-usuario:</h3>
                    <pre>{JSON.stringify(testResponse, null, 2)}</pre>
                </div>
            )}

            {error && (
                <div style={{ color: "red", marginTop: "1rem" }}>
                    <strong>Error:</strong> {error}
                </div>
            )}
        </div>
    );
}
