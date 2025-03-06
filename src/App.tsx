import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import DataImport from "./pages/DataImport";
import Files from "./pages/Files";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-import" element={<DataImport />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </div>
  );
}

export default App;
