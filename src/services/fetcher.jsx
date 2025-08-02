const API_BASE_URL = "http://localhost:3900/api"; // Ahora incluye /api

// Obtener el token desde localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Función para GET
export function get(endpoint) {
    const token = getToken();

    return fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    }).then((res) => res.json());
}

// Función para POST, PUT, DELETE, etc.
export function callApi(method, endpoint, data) {
    const token = getToken();

    return fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}
