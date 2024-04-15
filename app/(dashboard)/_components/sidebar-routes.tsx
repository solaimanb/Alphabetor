"use client";
import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const alphaRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    label: "Search",
    path: "/search",
  },
];

const SidebarRoutes = () => {
  const routes = alphaRoutes;

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
