// src/components/PostItem.jsx
import { useContext, useState } from "react";
import { format } from "date-fns";
import { ChatCircle, Heart, Repeat, BookmarkSimple } from "phosphor-react";
import { AuthContext } from "../../context/AuthContext";
import { useToggleLike } from "../../hooks/useToggleLike";
import CommentsItem from "./CommentsItem";
import UserRow from "../common/UserRow";

function PostItem({ post }) {
    const [showComments, setShowComments] = useState(false);
    const { user: authUser } = useContext(AuthContext);
    const myUserName = authUser?.name;

    const { isUserLiked, handleLikeToggle, isLoading } = useToggleLike();

    const formattedDate = format(new Date(post.created_at), "d MMM 'at' H:mm");

    return (
        <div className="post__item card">
            {/* Header, ahora es mucho más simple */}
            <UserRow
                avatar={post.user.image}
                name={post.user.name}
                subtext={formattedDate}
                targetUserId={post.user.id} // Pasar solo los IDs que necesita para su lógica
            />

            {/* Resto del componente sigue igual */}
            <p className="post__text">{post.text}</p>

            {post.file?.trim() && (
                <div className="post__image__wrapper">
                    <img
                        src={
                            post.file.startsWith("http")
                                ? post.file
                                : `http://localhost:3900/api/publication/media/${post.file}`
                        }
                        alt="post-image"
                        className="post__image"
                    />
                </div>
            )}

            <div className="post__actions">
                <button
                    onClick={() => setShowComments((prev) => !prev)}
                    className="post__button icon"
                >
                    <ChatCircle size={16} weight="regular" className="icon" />
                    {post.comments?.length || 0}
                </button>
                <button
                    onClick={() => handleLikeToggle(post._id)}
                    disabled={isLoading}
                    className="post__button icon"
                >
                    {isUserLiked(post) ? (
                        <Heart size={16} weight="fill" color="red" className="icon" />
                    ) : (
                        <Heart size={16} weight="regular" className="icon" />
                    )}
                    {post.likes?.length || 0}
                </button>
                <button className="post__button icon">
                    <Repeat size={16} weight="regular" className="icon" /> 231
                </button>
                <button className="post__button icon">
                    <BookmarkSimple size={16} weight="regular" className="icon" /> 12
                </button>
            </div>

            {showComments && post.comments && (
                <CommentsItem
                    comments={post.comments}
                    avatar={post.user?.image}
                    user={myUserName}
                    postId={post._id}
                />
            )}
        </div>
    );
}

export default PostItem;