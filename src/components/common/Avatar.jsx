import { User } from "phosphor-react";

function Avatar({ src, alt, size = 40, isOnline }) {
  return (
    <div
      className="avatar-wrapper"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: isOnline ? "3px solid limegreen" : "3px solid transparent",
        boxSizing: "border-box",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <User size={size * 0.6} color="#888" weight="bold" />
      )}
    </div>
  );
}

export default Avatar;
