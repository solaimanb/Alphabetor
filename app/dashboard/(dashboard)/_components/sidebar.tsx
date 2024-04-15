import { BookOpen, Text } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full md:border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href={"/"} className="p-4 flex items-center gap-1 text-brand">
        <BookOpen />
        <h1 className="text-xl uppercase font-bold">Alphabetor</h1>
      </Link>

      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
