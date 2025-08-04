import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <span>{user?.name || "Usuario"}</span>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
