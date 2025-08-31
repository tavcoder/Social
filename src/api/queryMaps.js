export const queryEndpointsMap = {
    // USER
    profile: (id) => `user/profile/${id}`,           // Devuelve info del perfil de un usuario
    counters: (id) => `user/counters/${id}`,        // Devuelve contadores del usuario (posts, followers, etc.)
    allUsersData: (page) => `user/list/${page}`,    // Devuelve lista de usuarios paginada
    listUsers: (page) => `user/list/${page}`,       // Alias para lista de usuarios
    avatar: (file) => `user/avatar/${file}`,        // Devuelve avatar del usuario
    pruebaUser: () => `user/prueba-usuario`,       // Ruta de prueba usuario

    // PUBLICATION
    userPosts: (id, page) => `publication/user/${id}/${page}`,      // Devuelve publicaciones de un usuario
    followingPosts: (page) => `publication/feed/${page}`,           // Devuelve publicaciones del feed
    comments: (postId) => `publication/${postId}/comments`,         // Devuelve comentarios de una publicación
    detail: (id) => `publication/detail/${id}`,                     // Devuelve detalle completo de una publicación
    media: (file) => `publication/media/${file}`,                   // Devuelve media de una publicación
    pruebaPublication: () => `publication/prueba-publication`,      // Ruta de prueba publicación

    // FOLLOW
    following: (id, page) => `follow/following/${id}/${page}`,                    // Devuelve total de usuarios que sigo
    followers: (id, page) => `follow/followers/${id}/${page}`,                    // Devuelve total de mis seguidores
};

export const querySelectMap = {
    // USER
    profile: (res) => res,                        // Devuelve info del perfil
    counters: (res) => res,                       // Devuelve contadores del usuario
    allUsersData: (res) => res.users || [],       // Devuelve lista de usuarios
    listUsers: (res) => res.users || [],          // Devuelve lista de usuarios
    avatar: (res) => res,                          // Devuelve URL o info del avatar
    pruebaUser: (res) => res,                     // Devuelve resultado de prueba usuario

    // PUBLICATION
    userPosts: (res) => res.publications,         // Devuelve publicaciones del usuario
    followingPosts: (res) => res.publications,    // Devuelve publicaciones del feed
    comments: (res) => res.comments,              // Devuelve comentarios
    detail: (res) => res,                         // Devuelve detalle de publicación
    media: (res) => res,                          // Devuelve media
    pruebaPublication: (res) => res,              // Devuelve resultado de prueba publicación

    // FOLLOW
    following: (res) => res,                // Devuelve total de usuarios que sigo
    followers: (res) => res,                // Devuelve total de mis seguidores
};
