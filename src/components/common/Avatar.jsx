import { User } from "phosphor-react";
import { useNavigate } from "react-router";
import { useOnlineStatus } from "@/hooks/users";

/**
 * Avatar component
 *
 * Displays a user's avatar image with an online status indicator.
 * Falls back to a default user icon if no image is available.
 * Clicking the avatar navigates to the user's timeline.
 *
 * @component
 * @param {Object} props
 * @param {string} props.src - The image source (file name, blob URL, or full URL)
 * @param {string} props.alt - Alternative text for the image
 * @param {number} [props.size=40] - Size of the avatar in pixels
 * @param {string} props.userId - The user's ID, used for navigation and online status
 *
 */

export default function Avatar({ src, alt, size = 40, userId }) {
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus(userId);

  const handleClick = () => {
    // Navega a la ruta del usuario pasando su id
    navigate(`/feed/timeline/${userId}`);
  };

  // Construct the full image URL
  const getImageSrc = () => {
    if (!src || src.includes('default.png')) return null;

    // If src is already a full URL (like CDN), use it as-is
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:')) {
      return src;
    }

    // Otherwise, construct the full API URL for local avatars
    return `http://localhost:3900/api/user/avatar/${src}`;
  };

  const imageSrc = getImageSrc();

  return (
    <div
      className="avatar__wrapper"
      style={{
        width: size,
        height: size,
        border: isOnline ? "2px solid limegreen" : "2px solid transparent",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {imageSrc ? (
        <img className="avatar__img" src={imageSrc} alt={alt} />
      ) : (
        <User size={size * 0.6} color="#888" weight="bold" />
      )}
    </div>
  );
}
