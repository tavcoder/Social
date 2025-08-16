import { BrowserRouter, Routes, Route } from "react-router";
import PrivateRoute from "./components/navigation/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import People from "./pages/People";

function App() {
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
          <Route path="timeline" element={<Timeline />} />
          <Route path="people" element={<People />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;