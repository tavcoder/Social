import { User } from "phosphor-react";
import { useNavigate } from "react-router";

export default function Avatar({ src, alt, size = 40, isOnline, userId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navega a la ruta del usuario pasando su id
    navigate(`/feed/user/${userId}`);
  };

  return (
    <div
      className="avatar__wrapper"
      style={{
        width: size,
        height: size,
        border: isOnline ? "3px solid limegreen" : "3px solid transparent",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {src ? (
        <img className="avatar__img" src={src} alt={alt} />
      ) : (
        <User size={size * 0.6} color="#888" weight="bold" />
      )}
    </div>
  );
}
