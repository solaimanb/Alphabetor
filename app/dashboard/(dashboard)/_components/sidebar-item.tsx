"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  children?: React.ReactNode;
}

export const SidebarItem = ({ icon: Icon, label, path }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/dashboard" && path === "/dashboard") ||
    pathname === path ||
    pathname?.startsWith(`${path}/dashboard`);

  const onClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-1 text-brand font-[500] transition-all w-full",
        isActive ? "bg-gray-100 text-brand" : "hover:bg-gray-50"
      )}
    >
      <div className="flex items-center gap-x-2 py-3 border-black w-full pl-4">
        <Icon size={24} />
        <span>{label}</span>
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-brand h-12 transition-all ",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
