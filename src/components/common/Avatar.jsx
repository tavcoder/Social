import { User } from "phosphor-react";

function Avatar({ src, alt, size = 40, isOnline }) {
  return (
    <div
      className="avatar__wrapper"
      style={{
        width: size,
        height: size,
        border: isOnline ? "3px solid limegreen" : "3px solid transparent",
      }}
    >
      {src ? (
        <img className="avatar__img"
          src={src}
          alt={alt}
        />
      ) : (
        <User size={size * 0.6} color="#888" weight="bold" />
      )}
    </div>
  );
}

export default Avatar;
