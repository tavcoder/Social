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
            ...(token && { Authorization: token }),
        },
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API GET Error ${res.status} (${endpoint}):`, errorData);
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }).catch((error) => {
        if (error.message.includes('fetch')) {
            console.error('Network error in GET:', error);
            throw new Error('Error de conexión. Verifica tu internet.');
        }
        throw error;
    });
}

// Función para POST, PUT, DELETE, etc.
export function callApi(method, endpoint, data) {
    const token = getToken();

    return fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: token }),
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API ${method} Error ${res.status} (${endpoint}):`, errorData);
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }).catch((error) => {
        if (error.message.includes('fetch')) {
            console.error('Network error in callApi:', error);
            throw new Error('Error de conexión. Verifica tu internet.');
        }
        throw error;
    });
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
            ...(token && { Authorization: token }),
        },
        body: formData,
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API UPLOAD Error ${res.status} (publication/upload/${publicationId}):`, errorData);
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }).catch((error) => {
        if (error.message.includes('fetch')) {
            console.error('Network error in uploadPublicationFile:', error);
            throw new Error('Error de conexión. Verifica tu internet.');
        }
        throw error;
    });
}
