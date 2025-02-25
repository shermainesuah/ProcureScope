import Navbar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray flex flex-col">
      <Navbar />
      <LoginPage />
    </div>
  );
}

export default App;
