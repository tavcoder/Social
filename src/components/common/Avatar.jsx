import { User } from "phosphor-react";
import { useNavigate } from "react-router";
import { useOnlineStatus } from "@/hooks/users";
export default function Avatar({ src, alt, size = 40, userId }) {
  const navigate = useNavigate();
  const { isOnline } = useOnlineStatus(userId);
  console.log("UserId para followers:", userId);

  const handleClick = () => {
    // Navega a la ruta del usuario pasando su id
    navigate(`/feed/timeline/${userId}`);
  };
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
      {!src || src === "default.png" ? (
        <User size={size * 0.6} color="#888" weight="bold" />
      ) : (
        <img className="avatar__img" src={src} alt={alt} />
      )}


    </div>
  );
}
