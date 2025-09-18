// Componente para botones de acción reutilizables con icono y etiqueta - Props: onClick (function), icon (element), label (string), className (string, opcional)
export default function ActionButton({ onClick, icon, label, className = "" }) {
  return (
    <button
      onClick={onClick}
      className= {className}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
