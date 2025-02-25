import logo from "../assets/logo.svg"; // Import your logo from src/assets

const Navbar: React.FC = () => {
  return (
    <nav className=" text-primary px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logo} alt="ProcureScope Logo" className="h-8 w-8" />
        <span className="text-xl font-bold font-mono">ProcureScope</span>
      </div>
    </nav>
  );
};

export default Navbar;
