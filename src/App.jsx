import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import People from "./pages/People";
import Messages from "./pages/Messages";

const routesWithLayout = [
  { path: "/home", element: <Home /> },
  { path: "/timeline", element: <Timeline /> },
  { path: "/people", element: <People /> },
  { path: "/messages", element: <Messages /> },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial sin navbar */}
        <Route path="/" element={<AuthPage />} />

        {/* Rutas con layout (Navbar incluido) */}
        {routesWithLayout.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<Layout>{element}</Layout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;