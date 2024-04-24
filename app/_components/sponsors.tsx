"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Image from "next/image";

const breakpoints = {
  320: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 5,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 6,
    spaceBetween: 40,
  },
};

const Sponsors = () => {
  const sponsorsList = [
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/44022f13-20df-4666-9111-cede3e5dc5b6-2cc39992c67a.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/a7e2febc-e366-4b23-9fc3-5659cf53d452-fbcc652f58e1.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/31705519-3082-4c18-aa23-1caf9a038b1c-21ab36bd68bc.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/8554749f-b920-4d7f-8986-af6bb95290aa-f336c6a2ca11.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/0d58600d-bb5f-4036-b222-b770d238331a-f11f10a8cbbc.png",
    },
    {
      imgUrl:
        "https://prod-discovery.edx-cdn.org/organization/logos/75831d72-095d-4fa8-9d79-88782a11fe9f-aeea98004d23.png",
    },
  ];

  return (
    <div className="py-5 bg-gray-50 items-center">
      {typeof window !== "undefined" && (
        <div className="container mx-auto flex flex-row h-full">
          {sponsorsList?.map((sponsor, index) => (
            <Image
              key={index}
              src={sponsor?.imgUrl}
              alt={`Sponsor ${index + 1}`}
              className="w-20 h-10 md:w-28 md:h-14 mx-auto"
              width={500}
              height={500}
            />
          ))}
        </div>

        // <Swiper
        //   loop={true}
        //   spaceBetween={2}
        //   breakpoints={breakpoints}
        //   className="container mx-auto flex flex-row h-full"
        // >
        //   {sponsorsList?.map((sponsor, index) => (
        //     <SwiperSlide key={index}>
        //       <Image
        //         src={sponsor?.imgUrl}
        //         alt={`Sponsor ${index + 1}`}
        //         className="w-20 h-10 md:w-28 md:h-14 mx-auto"
        //         width={500}
        //         height={500}
        //       />
        //     </SwiperSlide>
        //   ))}
        // </Swiper>
      )}
    </div>
  );
};

export default Sponsors;
