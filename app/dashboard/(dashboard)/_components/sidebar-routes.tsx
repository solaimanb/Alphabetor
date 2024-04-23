"use client";
import { BarChart3, Compass, Layout, LayoutList } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useClerk } from "@clerk/nextjs";

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
  const { signOut } = useClerk();

  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col">
      {routes.map((route) => (
        <>
          <SidebarItem
            key={route?.path}
            icon={route?.icon}
            label={route?.label}
            path={route?.path}
          />
          <Separator />
        </>
      ))}
    </div>
  );
};

export default SidebarRoutes;
