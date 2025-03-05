import { CircleUser, FileSpreadsheet, LogOut } from "lucide-react";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  return (
    <nav className=" text-primary px-8 py-4 flex items-center justify-between">
      <Link to="/dashboard">
        <div className="flex items-center gap-2 hover:cursor-pointer">
          <img src={logo} alt="ProcureScope Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">ProcureScope</span>
        </div>
      </Link>
      {currentLocation.pathname !== "/login" && (
        <div className="flex gap-7">
          <Link to="/data-import">
            <FileSpreadsheet className="h-5 w-5 text-primary hover:text-secondary hover:cursor-pointer" />
          </Link>
          <Link to="">
            <CircleUser className="h-5 w-5 text-primary hover:text-secondary hover:cursor-pointer" />
          </Link>
          <Link to="/login">
            <LogOut
              onClick={() => {
                navigate("/login");
              }}
              className="h-5 text-primary hover:text-secondary w-5 hover:cursor-pointer"
            />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
