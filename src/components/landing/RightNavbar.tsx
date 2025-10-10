import React, { useState } from "react";
import LandingPage from "../../pages/LandingPage";
import ResumePage from "../../pages/resumepage";

// Top Navbar
const TopNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex justify-between items-center px-6 z-40">
      {/* Left side: Company name */}
      <div className="text-xl font-bold text-orange-400">Gnanify</div>

      {/* Right side: Coins, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        {/* Coins */}
        <div className="flex items-center bg-yellow-400 text-black rounded-full px-3 py-1 font-semibold">
          <span className="mr-1">💰</span> 120
        </div>

        {/* Notifications */}
        <button className="relative">
          🔔
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold cursor-pointer">
          N
        </div>
      </div>
    </nav>
  );
};

// Left Sidebar
const LeftSidebar: React.FC<{ selected: string; setSelected: (page: string) => void }> = ({
  selected,
  setSelected,
}) => {
  const buttons = [
    { icon: "🏠", title: "Home" },
    { icon: "💻", title: "Compiler" },
    { icon: "📄", title: "Resume" },
    { icon: "👤", title: "Profile" },
    { icon: "📝", title: "Blogs" },
    { icon: "📚", title: "Courses" },
    { icon: "🤝", title: "Connections" },
    { icon: "⚙️", title: "Settings" },
    { icon: "✉️", title: "Messages" },
    { icon: "🚪", title: "Logout" },
  ];

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 flex flex-col justify-start bg-white shadow-lg z-50 py-2 items-center">
      {buttons.map((btn) => (
        <div key={btn.title} className="flex flex-col items-center my-2">
          <button
            onClick={() => setSelected(btn.title)}
            className={`flex items-center justify-center w-12 h-12 rounded transition-colors duration-200 ${
              selected === btn.title ? "bg-yellow-300" : "hover:bg-gray-200"
            }`}
          >
            {btn.icon}
          </button>
          <span className="text-xs mt-1 text-black">{btn.title}</span>
        </div>
      ))}
    </div>
  );
};

// Main App Layout
const AppLayout: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("Home");

  const renderPage = () => {
    switch (selectedPage) {
      case "Home":
        return <LandingPage />;
      case "Resume":
        return <ResumePage />;
      // Add other pages here as needed
      default:
        return <LandingPage />;
    }
  };

  return (
    <div>
      <TopNavbar />
      <LeftSidebar selected={selectedPage} setSelected={setSelectedPage} />
      <div className="ml-20 mt-16 p-4">{renderPage()}</div>
    </div>
  );
};

export default AppLayout;
