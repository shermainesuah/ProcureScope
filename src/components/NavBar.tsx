import { CircleUser, FileSpreadsheet, LogOut } from "lucide-react";
import logo from "../assets/logo.svg"; // Import your logo from src/assets
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className=" text-primary px-8 py-4 flex items-center justify-between">
      <div
        className="flex items-center gap-2 hover:cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img src={logo} alt="ProcureScope Logo" className="h-8 w-8" />
        <span className="text-xl font-bold font-mono">ProcureScope</span>
      </div>
      <div className="flex gap-7">
        <FileSpreadsheet
          onClick={() => {
            navigate("/data-import");
          }}
          className="h-5 w-5 text-textColor-primary hover:text-secondary hover:cursor-pointer"
        />
        <CircleUser className="h-5 w-5 text-textColor-primary hover:text-secondary hover:cursor-pointer" />
        <LogOut
          onClick={() => {
            navigate("/login");
          }}
          className="h-5 text-textColor-primary hover:text-secondary w-5 hover:cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
