
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  userType: "user" | "admin";
}

const Layout = ({ userType }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 pt-[60px]">
        <Sidebar isOpen={sidebarOpen} type={userType} />
        
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "md:ml-[250px]" : "ml-0"
          }`}
        >
          <div className="p-6 min-h-[calc(100vh-60px-56px)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
