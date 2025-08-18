// src/components/post/PostImage.jsx
import { useState } from "react";

const PostImage = ({ file, alt = "post-image" }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    if (!file?.trim()) return null;

    const src = error
        ? "/images/fallback.jpg" // 👈 fallback por si falla
        : file.startsWith("http")
            ? file
            : `http://localhost:3900/api/publication/media/${file}`;

    return (
        <div className="post__image__wrapper relative">
            {/* Skeleton loader */}
            {loading && !error && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
            )}

            <img
                src={src}
                alt={alt}
                className={`post__image transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
                    }`}
                loading="lazy"
                onLoad={() => setLoading(false)} // cuando carga, ocultamos el skeleton
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
            />
        </div>
    );
};

export default PostImage;
