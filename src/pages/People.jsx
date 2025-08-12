import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, callApi } from "../api/apiHelper";
import { useApiQuery } from "../api/useApiQuery";
import { AuthContext } from "../context/AuthContext";

function People() {
    const { user: authUser } = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const myUserId = authUser?.id;

    // Obtener todos los usuarios y filtrar el usuario logueado aquí
    const { data: allUsersDataRaw = [], isLoading: allUsersLoading, isError: allUsersError } = useApiQuery('allUsersData', page);


    // Filtramos para eliminar el usuario logueado
    const allUsersData = allUsersDataRaw.filter(user => user._id !== myUserId);
    // Obtener usuarios que sigo
    const { data: followingData, isLoading, isError } = useApiQuery('followingPage', { userId: myUserId, page: 1 }, { enabled: !!myUserId });


    const isUserFollowing = (userId) => {
        const followingList = followingData?.user_following || [];
        return followingList.includes(userId);
    };

    // Mutaciones con optimistic updates
    const followMutation = useMutation({
        mutationFn: async (userId) => {
            return await callApi("POST", `follow/save`, { followed: userId });
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries(['following', myUserId]);

            const previousFollowing = queryClient.getQueryData(['following', myUserId]);

            queryClient.setQueryData(['following', myUserId], oldData => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    user_following: [...oldData.user_following, userId]
                };
            });

            return { previousFollowing };
        },
        onError: (err, userId, context) => {
            queryClient.setQueryData(['following', myUserId], context.previousFollowing);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['following', myUserId]);
        }
    });

    const unfollowMutation = useMutation({
        mutationFn: async (userId) => {
            return await callApi("DELETE", `follow/unfollow/${userId}`);
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries(['following', myUserId]);

            const previousFollowing = queryClient.getQueryData(['following', myUserId]);

            queryClient.setQueryData(['following', myUserId], oldData => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    user_following: oldData.user_following.filter(id => id !== userId)
                };
            });

            return { previousFollowing };
        },
        onError: (err, userId, context) => {
            queryClient.setQueryData(['following', myUserId], context.previousFollowing);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['following', myUserId]);
        }
    });


    const handleFollowToggle = (targetUserId) => {
        if (isUserFollowing(targetUserId)) {
            unfollowMutation.mutate(targetUserId);
        } else {
            followMutation.mutate(targetUserId);
        }
    };

    // Loading y errores
    if (isLoading || allUsersLoading) return <p>Cargando usuarios...</p>;
    if (isError || allUsersError) return <p>Error al cargar usuarios.</p>;

    // Filtrar usuarios
    const filteredUsers = allUsersData.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.nick.toLowerCase().includes(search.toLowerCase())
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

            {filteredUsers.map((u) => {
                const isFollowing = isUserFollowing(u._id);
                return (
                    <div
                        key={u._id}
                        style={{
                            borderBottom: "1px solid #ccc",
                            padding: "1rem 0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <img src={u.image || '/avatar.png'} width="50" alt={u.name} />
                            <div>
                                <strong>{u.name}</strong>
                                <p>{u.nick}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleFollowToggle(u._id)}
                            style={{
                                backgroundColor: isFollowing ? 'red' : 'green',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            {isFollowing ? "Dejar de seguir" : "Seguir"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default People;
