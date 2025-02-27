import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import DataImport from "./pages/DataImport";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-import" element={<DataImport />} />
      </Routes>
    </div>
  );
}

export default App;
