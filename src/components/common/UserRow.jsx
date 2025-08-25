// src/components/UserRow.jsx
import Avatar from "./Avatar";

export default function UserRow({
  avatar,
  name,
  subText,
  user,
  rightElement,
  className = "",
  onClick = () => { } // valor por defecto, no hace nada si no se pasa
}) {
  return (
    <div className={`${className} user__row`} onClick={onClick}>
      <Avatar src={avatar || user?.image} alt={name} size={40} />
      <div className="user__row__info">
        <p className="user__row__name">{name}</p>
        <p className="user__row__subtext">{subText}</p>
      </div>
      {rightElement && <div className="user__row__action">{rightElement}</div>}
    </div>
  );
};
