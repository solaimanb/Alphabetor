import Image from "next/image";

import Ad from "@/public/app-ad.png";
import Apple from "@/public/apple-store-badge-en.svg";
import Google from "@/public/google-play-badge-en.webp";

const AppFeaturedAd = () => {
  return (
    <div className="container bg-brandDark my-20 px-10 py-10 md:px-20 rounded-lg text-white flex flex-row items-center justify-between">
      <div className="h-full flex flex-col justify-between gap-y-10">
        <div>
          <h2 className="text-3xl xl:text-4xl font-bold w-60 xl:w-80">
            Download Alphabetor Mobile App &{" "}
            <span className="">Keep Learning</span> Ease
          </h2>
        </div>

        <div className="flex gap-x-2 mt-auto">
          <Image
            src={Apple}
            alt="apple-store-badge"
            className="w-[120px] h-10"
            width={500}
            height={500}
          />

          <Image
            src={Google}
            alt="google-play-badge"
            className="w-[120px] h-10"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="scale-125">
        <Image src={Ad} alt="" width={500} height={500} className="scale-150" />
      </div>
    </div>
  );
};

export default AppFeaturedAd;
