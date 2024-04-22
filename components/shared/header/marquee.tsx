import React from "react";
import FastMarquee from "react-fast-marquee";
import "./marquee.css";

const Marquee = () => {
  const text = "Alphabetor Exclusive Course Offer! 20% Give Way✨";

  return (
    <div className=" flex justify-center text-center w-full bg-black py-1">
      <FastMarquee gradient={false} speed={50}>
        <p id="marquee" className="uppercase text-gray-200 font-bold">
          {text}
        </p>
      </FastMarquee>
    </div>
  );
};

export default Marquee;
