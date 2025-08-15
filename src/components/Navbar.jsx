import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useApiQuery } from "../api/useApiQuery";
import { FaHome, FaBell, FaUsers, FaComments } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: profile } = useApiQuery('profile', user.id);



  const handleLogout = () => {
    logout();
    navigate("/");
  };
  console.log("user:", user);
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <h2>CozMeet</h2>
      </div>

      {/* Iconos de navegación */}
      <ul className="navbar__icons">
        <li>
          <NavLink to="/home">
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/messages">
            <FaComments />
          </NavLink>
        </li>
        <li>
          <NavLink to="/timeline">
            <FaBell />
          </NavLink>
        </li>
        <li>
          <NavLink to="/people">
            <FaUsers />
          </NavLink>
        </li>
      </ul>

      {/* Usuario */}
      <div className="navbar__user">
        <img src={profile?.user?.image} alt="avatar" />
        <span>{user?.name || "Usuario"}</span>
        <button className="switch-button">Switch</button>
      </div>
    </nav>
  );
}

export default Navbar;
