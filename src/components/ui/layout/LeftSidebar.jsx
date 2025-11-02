import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LogoutConfirmModal from "@/components/ui/modals/LogoutConfirmModal";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const buttons = [
    { icon: "🏠", title: "Home", path: "/" },
    // { icon: "💻", title: "Compiler", path: "/compiler" },
    
    { icon: "📄", title: "Resume", path: "/resume" },
    { icon: "📰", title: "Tech News", path: "/technews" },
    { icon: "📝", title: "Blogs", path: "/blogs" },
    { icon: "📚", title: "Courses", path: "/courses" },
    { icon: "🤝", title: "Connections", path: "/connections" },
    { icon: "📚", title: "Store", path: "/store" },
    { icon: "⚙️", title: "Settings", path: "/settings" },
    { icon: "🚪", title: "Logout" },
  ];

  const handleClick = (title, path) => {
    if (title === "Logout") {
      setLogoutOpen(true);
    } else if (path) {
      navigate(path);
    }
  };

  const doLogout = () => {
    logout();
    navigate("/", { replace: true }); // This will redirect to start page for unauthenticated users
  };

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-15 flex flex-col justify-start backdrop-blur-md bg-white/70 border-r border-black/10 shadow-lg z-[1000] py-2 items-center dark:bg-gray-900/60 dark:border-white/10">
      {buttons.map((btn) => (
        <div key={btn.title} className="flex flex-col items-center my-2">
          {btn.path ? (
            <NavLink
              to={btn.path}
              onClick={(e) => { e.stopPropagation(); navigate(btn.path); }}
              className={({ isActive }) =>
                `flex flex-col items-center`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded transition-colors duration-200 ${
                window.location.pathname === btn.path
                  ? 'bg-orange-500 text-white dark:bg-orange-400 dark:text-black'
                  : 'hover:bg-neutral-100 text-neutral-800 dark:hover:bg-gray-800/70 dark:text-white'
              }`}>
                {btn.icon}
              </div>
              <span className="text-xs mt-1 text-neutral-800 dark:text-white">{btn.title}</span>
            </NavLink>
          ) : (
            <button
              type="button"
              onClick={() => handleClick(btn.title, btn.path)}
              className={`flex flex-col items-center`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded transition-colors duration-200 hover:bg-neutral-100 text-neutral-800 dark:hover:bg-gray-800/70 dark:text-white`}>
                {btn.icon}
              </div>
              <span className="text-xs mt-1 text-neutral-800 dark:text-white">{btn.title}</span>
            </button>
          )}
        </div>
      ))}

      <LogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          doLogout();
        }}
      />
    </div>
  );
};

export default LeftSidebar;
