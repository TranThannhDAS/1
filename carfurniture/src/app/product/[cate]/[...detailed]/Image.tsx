"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
const Image: React.FC<{
  data: {
    image: string;
    path: string;
  }[];
}> = ({ data }) => {
  const [change, setChange] = useState<{ img: string; alt: string }>({
    img: data[0]?.image,
    alt: data[0]?.path,
  });
  const [fullScreen, seFullScreen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-[350px] min-[600px]:w-[500px] cursor-pointer relative">
        {fullScreen && (
          <div
            className="fixed top-2 right-3  z-[100] text-[30px] bg-white rounded-[50%] cursor-pointer p-1"
            onClick={() => seFullScreen(false)}
          >
            <IoArrowUndoCircleOutline />
          </div>
        )}
        <div
          className="w-full h-full absolute top-0 bg-[#00000000] left-0 z-10 hover:bg-[#0000007a]"
          onClick={() => seFullScreen(true)}
        ></div>
        <img
          src={change?.img}
          alt={change?.alt}
          className={`w-full h-full  ${
            fullScreen
              ? "fixed top-0 left-0 object-contain bg-[#121212] z-[99]"
              : " object-cover"
          }`}
        />
      </div>
      {data.length > 1 && (
        <div className="h-[100px] mt-3">
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="mySwiper h-full"
            spaceBetween={15}
            slidesPerView={5}
          >
            {data.map((f) => (
              <SwiperSlide
                key={f.path}
                onClick={() => setChange({ img: f.image, alt: f.path })}
                className="relative cursor-pointer"
              >
                <div className="w-full h-full  absolute top-0 bg-[#00000000] left-0 z-10 hover:bg-[#0000007a]"></div>
                <img
                  src={f.image}
                  alt={f.path}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Image;
