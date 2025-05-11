
const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-300 border-t">
      <div className="container mx-auto">
        <p>© {new Date().getFullYear()} Gramsansad Rohini. All rights reserved.</p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Dedicated to serving our community</p>
      </div>
    </footer>
  );
};

export default Footer;
