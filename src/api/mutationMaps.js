export const mutationEndpointsMap = {
    // USER
    register: () => 'user/register',
    login: () => 'user/login',
    updateUser: () => 'user/update',
    uploadAvatar: () => 'user/upload',

    // PUBLICATION
    createPublication: () => 'publication/save',
    deletePublication: ({ id }) => `publication/remove/${id}`,
    uploadPublicationFile: ({ id }) => `publication/upload/${id}`,
    toggleLike: ({ id }) => `publication/${id}/like`,
    addComment: ({ postId }) => `publication/${postId}/comment`,
    removeComment: ({ id, commentId }) => `publication/${id}/comment/${commentId}`,

    // FOLLOW
    follow: () => 'follow/follow',
    unfollow: ({ targetUserId }) => `follow/unfollow/${targetUserId}`,
};

export const mutationMethodMap = {
    // USER
    register: 'POST',
    login: 'POST',
    updateUser: 'PUT',
    uploadAvatar: 'POST',

    // PUBLICATION
    createPublication: 'POST',
    deletePublication: 'DELETE',
    uploadPublicationFile: 'POST',
    toggleLike: 'POST',
    addComment: 'POST',
    removeComment: 'DELETE',

    // FOLLOW
    follow: 'POST',
    unfollow: 'DELETE',
};

export const mutationBodyMap = {
    // USER
    register: (data) => data, // { name, surname, email, password, nick }
    login: (data) => data, // { email, password }
    updateUser: (data) => data, // user data to update
    uploadAvatar: (file) => ({ file0: file }), // FormData

    // PUBLICATION
    createPublication: (data) => data, // { text, file? }
    deletePublication: () => null,
    uploadPublicationFile: (file) => ({ file0: file }), // FormData
    toggleLike: () => null,
    addComment: (data) => data, // { text }
    removeComment: () => null,

    // FOLLOW
    follow: (data) => data, // { followed: userId }
    unfollow: () => null,
};

export const mutationSelectMap = {
    // USER
    register: (res) => res,
    login: (res) => res,
    updateUser: (res) => res,
    uploadAvatar: (res) => res,

    // PUBLICATION
    createPublication: (res) => res.publicationStored,
    deletePublication: (res) => res,
    uploadPublicationFile: (res) => res,
    toggleLike: (res) => res,
    addComment: (res) => res,
    removeComment: (res) => res,

    // FOLLOW
    follow: (res) => res,
    unfollow: (res) => res,
};