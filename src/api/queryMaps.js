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
    following: (id) => `follow/following/${id}`,                    // Devuelve total de usuarios que sigo
    followingPage: (id, page) => `follow/following/${id}/${page}`,  // Devuelve usuarios que sigo paginados
    followers: (id) => `follow/followers/${id}`,                    // Devuelve total de mis seguidores
    followersPage: (id, page) => `follow/followers/${id}/${page}`,  // Devuelve seguidores paginados
    pruebaFollow: () => `follow/prueba-follow`,                     // Ruta de prueba follow
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
    following: (res) => res.total,                // Devuelve total de usuarios que sigo
    followingPage: (res) => res,                  // Devuelve lista paginada de usuarios que sigo
    followers: (res) => res.total,                // Devuelve total de mis seguidores
    followersPage: (res) => res,                  // Devuelve todo: follows, total, pages, user_following, user_follow_me
    pruebaFollow: (res) => res,                   // Devuelve resultado de prueba follow
};
