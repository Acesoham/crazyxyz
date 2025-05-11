import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/auth/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-pulse">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Redirecting to Gramsansad Rohini Portal...</h1>
          <p className="text-gray-600 dark:text-gray-400">Please wait</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
