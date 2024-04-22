import Image from "next/image";
import "./hero.css";

const Hero = () => {
  return (
    <div id="hero" className="md:h-[70vh] xl:h-[84vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1528980917907-8df7f48f6f2a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="relative md:hidden w-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Hero;
