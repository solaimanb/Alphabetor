import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      alt="logo"
      src="/Alphabetor.png"
      width={150}
      height={150}
      className="w-28"
    />
  );
};
