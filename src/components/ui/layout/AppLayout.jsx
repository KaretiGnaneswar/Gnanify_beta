import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";

const AppLayout = () => {
  return (
    <div>
      <TopNavbar />
      <LeftSidebar />
      <div className="ml-20 mt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
