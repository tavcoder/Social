// src/components/UserRow.jsx
import Avatar from "./Avatar";
import OnlineStatus from "./OnlineStatus";
import RemovePostButton from "../post/RemovePostButton"; // Importar el componente aquí
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserRow = ({ avatar, name, subText, targetUserId, user, onClick, className = "" }) => {
  const { user: authUser } = useContext(AuthContext);
  const myUserId = authUser?.id;

  // Lógica para decidir si mostrar el botón de eliminar
  const canRemove = targetUserId === myUserId;

  return (
    <div className={`user__row ${className}`} onClick={onClick}>
      <Avatar src={avatar || user?.image} alt={name} size={40} />
      <div className="user__row__info">
        <p className="user__row__name">{name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>
      {/* Ahora UserRow maneja su propia lógica de renderizado de la acción */}
      {canRemove ? (
        <RemovePostButton targetUserId={targetUserId} myUserId={myUserId} />
      ) : (
        <OnlineStatus isOnline={user?.isOnline} />
      )}
    </div>
  );
};

export default UserRow;