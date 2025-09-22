const API_BASE_URL = "http://localhost:3900/api"; 

// Obtener el token desde localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Función para GET
export function get(endpoint) {
    const token = getToken();

    // No enviar token para rutas públicas
    const isPublicRoute = endpoint.includes('/prueba') || endpoint.includes('/ruta-prueba');

    const headers = {
        "Content-Type": "application/json",
        ...(!isPublicRoute && token && { Authorization: token }),
    };

    return fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers,
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API GET Error ${res.status} (${endpoint}):`, errorData);
            // Handle 404 for follow endpoints as success with empty data
            if (res.status === 404 && endpoint.includes('/follow/')) {
                return {
                    status: "success",
                    message: "No follow relationships found.",
                    follows: [],
                    total: 0,
                    page: 1,
                    pages: 0,
                    user_following: [],
                    user_follow_me: []
                };
            }
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }).catch((error) => {
        if (error.message.includes('fetch')) {
            console.error('Network error in GET:', error);
            throw new Error('Connection error. Check your internet.');
        }
        throw error;
    });
}

// Función para POST, PUT, DELETE, etc.
export function callApi(method, endpoint, data) {
    const token = getToken();

    // No enviar token para rutas públicas como register y login
    const isPublicRoute = endpoint.includes('/register') || endpoint.includes('/login');

    const headers = {
        "Content-Type": "application/json",
        ...(!isPublicRoute && token && { Authorization: token }),
    };

    const fullUrl = `${API_BASE_URL}/${endpoint}`;
    console.log(`API Call: ${method} ${fullUrl}`, data ? { data } : '');

    return fetch(fullUrl, {
        method,
        headers,
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API ${method} Error ${res.status} (${fullUrl}):`, errorData);
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        console.log(`API ${method} Success (${fullUrl})`);
        return res.json();
    }).catch((error) => {
        console.error(`API ${method} Failed (${fullUrl}):`, error);
        if (error.message.includes('fetch')) {
            console.error('Network error in callApi:', error);
            throw new Error('Connection error. Check your internet.');
        }
        throw error;
    });
}


// Función genérica para subir archivos
export function uploadFile(endpoint, file, fieldName = "file0") {
    const token = getToken();
    const formData = new FormData();

    formData.append(fieldName, file);

    return fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            ...(token && { Authorization: token }),
        },
        body: formData,
    }).then(async (res) => {
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error(`API UPLOAD Error ${res.status} (${endpoint}):`, errorData);
            throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
    }).catch((error) => {
        if (error.message.includes('fetch')) {
            console.error('Network error in uploadFile:', error);
            throw new Error('Connection error. Check your internet.');
        }
        throw error;
    });
}
