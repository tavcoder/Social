import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";
import { HouseSimple, ChatCircleDots, BellSimple, Users } from "phosphor-react";
import "../styles/Navbar.css";

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: profile } = useApiQuery("profile", user.id);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <h2>CozMeet</h2>
      </div>

      {/* Iconos de navegación */}
      <ul className="navbar__icons">
        <li>
          <NavLink to="/feed">
            <HouseSimple size={24} weight="regular" />
          </NavLink>
        </li>
        <li>
          <NavLink to="messages">
            <ChatCircleDots size={24} weight="regular" />
          </NavLink>
        </li>
        <li>
          <NavLink to="timeline">
            <BellSimple size={24} weight="regular" />
          </NavLink>
        </li>
        <li>
          <NavLink to="people">
            <Users size={24} weight="regular" />
          </NavLink>
        </li>
      </ul>

      {/* Usuario */}
      <div className="navbar__user">
        <img src={profile?.user?.image} alt="avatar" />
        <span>{user?.name || "Usuario"}</span>
        <button className="switch-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;