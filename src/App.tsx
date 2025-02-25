import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
