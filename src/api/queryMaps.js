// queryMaps.js
export const queryEndpointsMap = {
    profile: (id) => `user/profile/${id}`,
    counters: (id) => `user/counters/${id}`,
    userPosts: (id, page) => `publication/user/${id}/${page}`,
    followingPosts: (page) => `publication/feed/${page}`,
    comments: (postId) => `publication/${postId}/comments`,
    following: (id) => `follow/following/${id}`,
    followingPage: (params) => `follow/following/${params.userId}/${params.page}`,
    followers: (id) => `follow/followers/${id}`,
    avatar: (file) => `user/avatar/${file}`,
    allUsersData: (page) => `user/list/${page}`,
};

export const querySelectMap = {
    profile: (res) => res,
    userPosts: (res) => res.publications,
    followingPosts: (res) => res.publications,
    comments: (res) => res.comments,
    counters: (res) => res,
    following: (res) => res.total,
    followingPage: (res) => res,
    followers: (res) => res.total,
    allUsersData: (res) => res.users || [],
};
