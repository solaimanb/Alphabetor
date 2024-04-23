"use client";

import React from "react";
import SwiperCore from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Autoplay]);

const reviewsData = [
  {
    id: 1,
    user: "John Doe",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit orci consectetur, nec ultrices dolor varius.",
    rating: 5,
  },
  {
    id: 2,
    user: "Jane Smith",
    comment:
      "Sed cursus elit eget elit interdum, nec posuere nisi facilisis. Fusce auctor nisl vel tristique facilisis.",
    rating: 4,
  },
  {
    id: 3,
    user: "Jane Smith",
    comment:
      "Sed cursus elit eget elit interdum, nec posuere nisi facilisis. Fusce auctor nisl vel tristique facilisis.",
    rating: 4,
  },
  {
    id: 4,
    user: "Jane Smith",
    comment:
      "Sed cursus elit eget elit interdum, nec posuere nisi facilisis. Fusce auctor nisl vel tristique facilisis.",
    rating: 4,
  },
];

// const breakpoints = {
//   320: {
//     slidesPerView: 1,
//     spaceBetween: 10,
//   },
//   640: {
//     slidesPerView: 2,
//     spaceBetween: 20,
//   },
//   768: {
//     slidesPerView: 3,
//     spaceBetween: 30,
//   },
// };

interface ReviewProps {
  user: string;
  comment: string;
  rating: number;
}

const Review = ({ user, comment, rating }: ReviewProps) => {
  return (
    <div className="border bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-semibold mb-2">{user}</h3>
      <p className="text-gray-600 mb-4">{comment}</p>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-2">&#9733;</span>
        <span className="text-gray-700">{rating}/5</span>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="w-[90%] md:w-[70%] mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-center">Feedbacks</h2>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
        }}
        // breakpoints={breakpoints}
        pagination={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper relative container mx-auto w-full"
      >
        <div className="flex flex-row gap-5">
          {reviewsData.map((review) => (
            <SwiperSlide key={review?.id}>
              <Review
                user={review?.user}
                comment={review?.comment.slice(0, 120)}
                rating={review?.rating}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Testimonial;
