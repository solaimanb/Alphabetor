import {
  BookIcon,
  HomeIcon,
  InfoIcon,
  LogOut,
  Mail,
  SchoolIcon,
} from "lucide-react";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SignOutButton, SignedIn, SignedOut, auth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/courses", label: "Courses", icon: SchoolIcon },
  { path: "/bookshop", label: "Bookshop", icon: BookIcon },
  { path: "/about", label: "About", icon: InfoIcon },
  { path: "/contact", label: "Contact", icon: Mail },
];

const Sidebar = () => {
  return (
    <div className="h-full md:border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href={"/"} className="p-4 flex items-center gap-1 text-brand w-fit">
        <h2 className="font-bold italic text-xl md:text-2xl uppercase">
          Alphabetor
        </h2>
      </Link>

      <Separator />
      <SignedIn>
        <SidebarRoutes />
        <button
          type="button"
          className={cn(
            "flex items-center gap-x-1 text-brand font-[500] transition-all w-full"
          )}
        >
          <div className="flex items-center gap-x-2 py-3 border-black w-full pl-4">
            <LogOut />
            <SignOutButton />
          </div>
        </button>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center px-4 py-2 gap-x-2">
          <Link href={"/sign-in"}>
            <Button
              variant="brandOutline"
              size="sm"
              padding="lg"
              className="text-white"
            >
              Sign In
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button size="sm" padding="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </SignedOut>

      <SignedOut>
        <nav className="relative w-full justify-center flex flex-col list-none gap-x-4 xl:gap-x-6">
          {navLinks.map((link, index) => (
            <>
              <button
                key={index}
                type="button"
                className={cn(
                  "flex items-center gap-x-1 text-brand font-[500] transition-all w-full"
                )}
              >
                <Link href={link?.path} className="w-full">
                  <div className="flex items-center gap-x-2 py-3 border-black w-full pl-4">
                    {link?.label}
                  </div>
                </Link>
              </button>
              <Separator />
            </>
          ))}
        </nav>
      </SignedOut>

      <div className="mt-auto">
        <Separator />
        <p className="text-xs text-slate-800 py-2 px-4">
          &copy; {new Date().getFullYear()} Alphabetor. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
