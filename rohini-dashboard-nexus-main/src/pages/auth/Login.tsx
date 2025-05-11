import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { VoiceService } from '../../utils/voiceService';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize voice service when component mounts
    VoiceService.initialize();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In a real application, this would be an API call to authenticate
      // For this demo, we'll simulate a successful login
      setTimeout(() => {
        // Play welcome message after successful login
        VoiceService.welcomeMessage();
        // Redirect based on user type
        if (userType === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div>
          <div className="mx-auto h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-white text-xl font-bold">ZP</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('common.login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Access the Zilla Parishad Gramin Vibhag 
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{t('common.login.error')}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t('common.login.email')}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder={t('common.login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('common.login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder={t('common.login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="user-type-user"
                name="user-type"
                type="radio"
                checked={userType === "user"}
                onChange={() => setUserType("user")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
              />
              <label htmlFor="user-type-user" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                User
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="user-type-admin"
                name="user-type"
                type="radio"
                checked={userType === "admin"}
                onChange={() => setUserType("admin")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-700"
              />
              <label htmlFor="user-type-admin" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Admin
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? t('common.login.signing_in') : t('common.login.submit')}
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="font-medium text-primary hover:text-primary/80">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
