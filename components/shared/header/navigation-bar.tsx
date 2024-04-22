import { PencilLine } from "lucide-react";
import Link from "next/link";
import HeaderAction from "./header-action";

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/courses", text: "Courses" },
  { to: "/bookshop", text: "Bookshop" },
  { to: "/about", text: "About" },
  { to: "/contact", text: "Contact" },
];

const NavigationBar = () => {
  return (
    <div className="bg-brand">
      <div className="container flex items-center text-white p-3 gap-x-10">
        <div className="flex justify-between items-center text-end gap-10">
          <Link href={"/"}>
            <h2 className="font-bold italic text-2xl md:text-3xl uppercase">
              Alphabetor
            </h2>
            <span className="text-xs italic text-end p-1 font-bold capitalize flex items-center justify-end gap-1">
              <PencilLine size={14} /> Guides The Way
            </span>
          </Link>
        </div>

        <nav className="relative w-full justify-center hidden md:flex list-none gap-x-4 xl:gap-x-6">
          {navLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.to}>
                <p className="pb-1 font-medium flex items-center gap-1 hover:text-gray-200 hover:border-gray-200">
                  {link.text}
                </p>
              </Link>
            </div>
          ))}
        </nav>

        <HeaderAction />
      </div>
    </div>
  );
};

export default NavigationBar;
