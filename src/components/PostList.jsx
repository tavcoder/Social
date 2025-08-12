import { useQuery } from "@tanstack/react-query";
import { get } from "../api/apiHelper";
import PostItem from "./PostItem";

function PostList({ userId }) {
    const page = 1;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["posts", userId, page],
        queryFn: async () => {
            if (userId) {
                const res = await get(`publication/user/${userId}/${page}`);
                return res.publications;
            } else {
                const res = await get(`publication/feed/${page}`);
                return res.publications;
            }
        },
        enabled: !!userId || userId === undefined, // evita ejecutar si userId es null
    });
    if (isLoading) return <p>Cargando posts...</p>;
    if (isError) return <p>Error al cargar los posts.</p>;

    return (
        <div className="post-list">
            {data && data.map((post) => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
