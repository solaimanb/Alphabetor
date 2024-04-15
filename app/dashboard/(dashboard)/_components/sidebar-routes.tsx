"use client";
import {
  BarChart,
  BarChart3,
  Compass,
  Layout,
  LayoutList,
  List,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: Compass,
    label: "Search",
    path: "/dashboard/search",
  },
];

const teacherRoutes = [
  {
    icon: LayoutList,
    label: "Courses",
    path: "/dashboard/teacher/courses",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/dashboard/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route?.path}
          icon={route?.icon}
          label={route?.label}
          path={route?.path}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
