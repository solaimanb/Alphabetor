import { auth } from "@clerk/nextjs";
import React from "react";
import Marquee from "./marquee";
import HeaderContact from "./header-contact";
import NavigationBar from "./navigation-bar";

const Header = () => {
  return (
    <header className="flex flex-col">
      <Marquee />

      {/*
      <div className="container p-2 flex justify-center items-center gap-4">
        <HeaderContact />
      </div>
      */}

      <NavigationBar />
    </header>
  );
};

export default Header;
