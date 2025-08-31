import { Outlet, useParams } from "react-router";
import { UserProfileSidebar, UserSuggestions } from "@/components/user";
import { Navbar } from "@/components/navigation";
import { Messages } from "@/components/chat";
import "../styles/MainLayout.css";

function MainLayout() {
    const { userId } = useParams();
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
