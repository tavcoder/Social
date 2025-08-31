import { BrowserRouter, Routes, Route } from "react-router";
import { PrivateRoute } from "@/components/navigation";
import { AuthPage, MainLayout, Home, Timeline, EditUserProfile, People } from "@/pages";

function App() {
  ("App render");
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para la autenticación */}
        <Route path="/" element={<AuthPage />} />

        {/* Ruta protegida y anidada para el layout principal.
                  Todas las rutas anidadas compartirán el mismo MainLayout.
                */}
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Contenido que se renderiza dentro del <Outlet> de MainLayout */}
          <Route index element={<Home />} />
          <Route path="timeline/:userId?" element={<Timeline />} />
          <Route path="people/:type?/:userId?" element={<People />} />
          <Route path="editprofile" element={<EditUserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;