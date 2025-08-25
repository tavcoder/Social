import { NavLink, useNavigate } from "react-router";
import { useId } from "react";
import { BellSimple } from "phosphor-react";
import { useProfile } from "../../hooks/useProfile";
import Avatar from "../common/Avatar";

function Navbar() {
  const navigate = useNavigate();
  const { authUser, profile } = useProfile();
  const id = useId(); // Genera un ID único para este componente

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Feed", path: "" },
    { name: "Timeline", path: "timeline" },
    { name: "People", path: "people" },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <h2 className="navbar__logo-text">CozMeet</h2>
      </div>

      {/* Iconos de navegación */}
      <div className="navbar__menu">
        <ul className="navbar__list">
          {menuItems.map((item, index) => (
            <li key={`${id}-${index}`} className="navbar__item">
              <NavLink to={item.path} className="navbar__link">
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Usuario */}
      <div className="navbar__user">
        <Avatar
          src={profile?.user?.image}
          alt={authUser?.name}
          size={30}
          className="navbar__avatar"
          userId={authUser.id}
        />
        <BellSimple className="navbar__icon" size={15} weight="regular" />
      </div>
    </nav>
  );
}

export default Navbar;
