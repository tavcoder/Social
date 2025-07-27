import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import People from "./pages/People";
import Messages from "./pages/Messages";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="layout__main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/people" element={<People />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
