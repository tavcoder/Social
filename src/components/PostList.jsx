// PostList.jsx
import PostItem from "./PostItem";
import { useInfiniteApiQuery } from "../api/useInfiniteApiQuery"; // Importa el hook correcto

function PostList({ userId }) {
    const page = 1;
    const queryKey = userId ? "userPosts" : "followingPosts";
    const queryParams = userId ? [userId, page] : [page];

    const { data, isError, InfiniteList, spinner } =
        useInfiniteApiQuery(queryKey, queryParams);

    if (spinner) return spinner; // Spinner inicial
    if (isError) return <p style={{ textAlign: "center" }}>⚠ Error al cargar los posts.</p>;

    return (
        <InfiniteList>
            {data?.pages.map((page) =>
                page.data.map((post) => <PostItem key={post._id} post={post} />)
            )}
        </InfiniteList>
    );
}

export default PostList;
