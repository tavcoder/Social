import { Outlet } from "react-router";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserSuggestions from "../components/UserSuggestions";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import "../styles/MainLayout.css";

function MainLayout() {
    return (
        <div className="app-container">
            {/* Navbar arriba */}
            <Navbar />

            <div className="content-container">
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
