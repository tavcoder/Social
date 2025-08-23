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
