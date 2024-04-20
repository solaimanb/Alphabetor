"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, LockIcon, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? LockIcon : isCompleted ? CheckIcon : PlayCircle;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 font-medium pl-6 transition-all hover:text-emerald-800 hover:bg-emerald-800/10",
        isActive ? "text-emerald-950 bg-emerald-800/10" : "text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-800",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-emerald-800",
            isCompleted && "text-emerald-600"
          )}
        />
        <span>{label}</span>
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-800 h-full transition-all",
          isActive && "opacity-100 border-emerald-800",
          isCompleted && "border-emerald-600"
        )}
      />
    </button>
  );
};
