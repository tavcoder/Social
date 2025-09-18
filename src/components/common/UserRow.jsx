// Componente para filas de usuario con avatar, nombre, subtexto y elemento derecho
//  - Props: user (object), subText (string), rightElement (ReactNode), className (string, opcional), onClick (function, opcional)
// src/components/UserRow.jsx
import {Avatar} from "@/components/common";

export default function UserRow({
  user,
  subText,
  rightElement,
  className = "",
  onClick = () => { } // valor por defecto, no hace nada si no se pasa
}) {
  if (!user) return null;
  return (
    <div className={`${className} user__row`} onClick={onClick}>
      <Avatar
        src={user?.image}
        alt={user.name}
        size={40}
        userId={user._id}
      />
      <div className="user__row__info">
        <p className="user__row__name">{user.name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>
      {rightElement && <div className="user__row__action">{rightElement}</div>}
    </div>
  );
};
