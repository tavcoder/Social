import PostList from "../components/PostList";
import NewPostForm from "../components/NewPostForm";
import UserProfileSidebar from "../components/UserProfileSidebar";

function Home() {
    return (
        
        <div className="home-container" style={{ display: "flex", gap: "2rem" }}>
            {/* Columna izquierda: publicaciones */}
            <section style={{ flex: 2 }}>
                <h2>Timeline <button>Mostrar nuevas</button></h2>
                <PostList />
                <button style={{ marginTop: "1rem" }}>Ver más publicaciones</button>
            </section>

            {/* Columna derecha: perfil + nuevo post */}
            <aside style={{ flex: 1 }}>
                <h2>Hola, Víctor</h2>
                <UserProfileSidebar />
                <NewPostForm />
            </aside>
        </div>
    );
}

export default Home;
