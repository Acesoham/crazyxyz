
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const TopNavbar = ({ toggleSidebar }: TopNavbarProps) => {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md fixed w-full top-0 z-50 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20 transition-all"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-3">
              <span className="text-white font-bold">ZP</span>
            </div>
            <Link to="/" className="text-xl md:text-2xl font-bold">
            ZILLA PARISHAD GRAMIN VIBHAG            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button 
              className="rounded-full bg-primary-foreground/10 p-2 hover:bg-primary-foreground/20 transition-all"
              aria-label="User profile"
            >
              <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-white text-xs font-bold">U</span>
              </div>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block animate-fade-in">
              <Link to="/auth/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Log In</Link>
              <Link to="/auth/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
