import { useRef, useEffect } from "react";
import PostItem from "./PostItem";
import { useApiQuery } from "../api/useApiQuery";

function Spinner() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <div
                style={{
                    width: "24px",
                    height: "24px",
                    border: "3px solid #ccc",
                    borderTop: "3px solid #333",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                }}
            />
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

function PostList({ userId }) {
    const page = 1;
    const queryKey = userId ? "userPosts" : "followingPosts";
    const queryParams = userId ? [userId, page] : page;

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useApiQuery(queryKey, queryParams, { infinite: true });

    const loaderRef = useRef(null);

    useEffect(() => {
        if (!loaderRef.current || !hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <Spinner />;
    if (isError) return <p style={{ textAlign: "center" }}>⚠ Error al cargar los posts.</p>;

    return (
        <div className="post-list">
            {data?.pages.map((page) =>
                page.data.map((post) => <PostItem key={post._id} post={post} />)
            )}

            {/* Loader para scroll infinito */}
            {hasNextPage && (
                <div ref={loaderRef} style={{ height: "40px" }}>
                    {isFetchingNextPage && <Spinner />}
                </div>
            )}
        </div>
    );
}

export default PostList;
