import { Book } from "lucide-react";
import { Logo } from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full md:border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4">
        <Logo />
      </div>

      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
