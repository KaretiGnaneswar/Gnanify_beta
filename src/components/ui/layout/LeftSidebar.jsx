import { useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  FiHome, FiBriefcase, FiFileText, FiRss, FiBook, FiBookOpen, 
  FiUsers, FiShoppingBag, FiSettings 
} from "react-icons/fi";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();

  const LEARN_URL = import.meta.env.VITE_LEARN_URL || "http://localhost:3001/";

  const buttons = [
    { icon: <FiHome size={20} />, title: "Home", path: "/" },
    { icon: <FiBriefcase size={20} />, title: "Jobs", path: "/jobs" },
    { icon: <FiFileText size={20} />, title: "Resume", path: "/resume" },
    { icon: <FiRss size={20} />, title: "Tech News", path: "/technews" },
    { icon: <FiBook size={20} />, title: "Blogs", path: "/blogs" },
    { icon: <FiBookOpen size={20} />, title: "Courses", path: "/courses" },
    { icon: <FiUsers size={20} />, title: "Connections", path: "/connections" },
    { icon: <FiShoppingBag size={20} />, title: "Store", path: "/store" },
    { icon: <FiSettings size={20} />, title: "Settings", path: "/settings" },
  ];

  const handleClick = (title, path) => {
    if (title === "Store") {
      // Build user payload and redirect to Learn app
      const nameFallback = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() || undefined;
      const payload = {
        name: user?.full_name || nameFallback || user?.username || user?.name || undefined,
        username: user?.username || undefined,
        email: user?.email || user?.primary_email || undefined,
        token: token || localStorage.getItem('auth_token') || undefined,
      };
      try {
        const blob = btoa(JSON.stringify(payload));
        window.location.href = `${LEARN_URL}?user=${encodeURIComponent(blob)}`;
      } catch {
        // Fallback to basic params if encoding fails
        const params = new URLSearchParams();
        if (payload.name) params.set("name", payload.name);
        if (payload.username) params.set("username", payload.username);
        if (payload.email) params.set("email", payload.email);
        if (payload.token) params.set("token", payload.token);
        window.location.href = `${LEARN_URL}?${params.toString()}`;
      }
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-15 flex flex-col justify-start backdrop-blur-md bg-white/70 border-r border-black/10 shadow-lg z-[1000] py-2 items-center dark:bg-gray-900/60 dark:border-white/10">
      {buttons.map((btn) => (
        <div key={btn.title} className="flex flex-col items-center my-2">
          {btn.path ? (
            <NavLink
              to={btn.path}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClick(btn.title, btn.path); }}
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
    </div>
  );
};

export default LeftSidebar;
