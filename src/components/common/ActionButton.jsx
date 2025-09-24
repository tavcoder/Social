/**
 * ActionButton component
 *
 * A reusable button component that displays an icon and an optional label.
 * Useful for action buttons in toolbars, cards, or lists where both an icon
 * and text might be needed.
 *
 * @component
 * @param {Object} props
 * @param {function} props.onClick - Callback function triggered when the button is clicked
 * @param {JSX.Element} props.icon - Icon element to display inside the button
 * @param {string} [props.label] - Optional text label displayed next to the icon
 * @param {string} [props.className] - Additional CSS classes for custom styling

 */
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
