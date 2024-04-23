import React from "react";
import Marquee from "./marquee";
import NavigationBar from "./navigation-bar";

const Header = () => {
  return (
    <header className="flex flex-col">
      <Marquee />

      <NavigationBar />
    </header>
  );
};

export default Header;
