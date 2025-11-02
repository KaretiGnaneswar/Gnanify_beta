import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <TopNavbar />
      <LeftSidebar />
      <div className="ml-20 mt-16 p-4">
        <Outlet />
      </div>
      
    </div>
  );
};

export default AppLayout;
