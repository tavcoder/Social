import { User } from "phosphor-react";
import { useNavigate } from "react-router";
import { useOnlineStatus } from "@/hooks/users";

// Componente para mostrar el avatar de un usuario con indicador de estado online
//  - Props: src (string), alt (string), size (number, opcional, default 40), userId (string)

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
