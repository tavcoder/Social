import { Outlet } from "react-router";
import UserProfileSidebar from "../components/user/UserProfileSidebar";
import UserSuggestions from "../components/user/UserSuggestions";
import Navbar from "../components/navigation/Navbar";
import Messages from "../components/chat/Messages";
import "../styles/MainLayout.css";

function MainLayout() {
    return (
        <div className="app__container">
            {/* Navbar arriba */}
            <Navbar />

            <div className="content__container">
                {/* Columna izquierda: perfil + actividad */}
                <aside className="sidebar-left">
                    <UserProfileSidebar />
                    <UserSuggestions />
                </aside>

                {/* Columna central: contenido dinámico */}
                <main className="feed">
                    <Outlet />
                </main>

                {/* Columna derecha: mensajes + sugerencias */}
                <aside className="sidebar-right">
                    <Messages />

                </aside>
            </div>
        </div>
    );
}

export default MainLayout;
