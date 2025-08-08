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
            ...(token && { Authorization: token  }),
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
            ...(token && { Authorization: token  }),
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

// Función para subir archivo a publicación
export function uploadPublicationFile(publicationId, file) {
    const token = getToken();
    const formData = new FormData();

    // Campo exacto que espera tu API
    formData.append("file0", file);

    return fetch(`${API_BASE_URL}/publication/upload/${publicationId}`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: token }), // OJO: Bearer
        },
        body: formData,
    }).then((res) => res.json());
}
