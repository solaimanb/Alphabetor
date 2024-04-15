"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashboard/teacher");
  const isLearnerPage = pathname?.includes("/dashboard/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isLearnerPage ? (
        <Link href={"/dashboard"}>
          <Button size={"sm"} variant={"ghost"}>
            <LogOut />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/dashboard/teacher/courses"}>
          <Button size={"sm"} variant={"ghost"}>
            Teacher Mode
          </Button>
        </Link>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
