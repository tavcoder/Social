import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>NGSOCIAL</h2>
      <ul>
        <li><NavLink to="/home">Inicio</NavLink></li>
        <li><NavLink to="/timeline">Timeline</NavLink></li>
        <li><NavLink to="/people">Gente</NavLink></li>
        <li><NavLink to="/messages">Mensajes</NavLink></li>
      </ul>
      <div className="navbar__user">
        <img src="/avatar.png" alt="Avatar" />
        <span>Víctor</span>
      </div>
    </nav>
  );
}

export default Navbar;
