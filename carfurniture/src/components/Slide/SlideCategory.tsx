"use client";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { CiSearch } from "react-icons/ci";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SiShopee } from "react-icons/si";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
const SlideSwiper: React.FC<{
  data?: { id: number; name: string }[];
  onClick: (v: number) => void;
  active: number;
  loading?: boolean;
}> = ({ data, onClick, active, loading }) => {
  return (
    <div
      className={`w-full flex rounded-[5px] px-1 py-2 relative ${styles.pagination}`}
    >
      <div className="w-full bg-[aliceblue] ">
        <Swiper
          slidesPerView={3}
          pagination={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            800: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          className={`${styles.mySwiper} `}
        >
          {loading ? (
            <p>Loading...</p>
          ) : data && data.length > 0 ? (
            data?.map((d) => (
              <SwiperSlide key={d.id}>
                <h3
                  className={`text-xs   md:text-sm xl:text-base cursor-pointer ${
                    active === d.id ? "text-blue-500" : ""
                  }`}
                  onClick={() => onClick(d.id)}
                >
                  {d.name}
                </h3>
              </SwiperSlide>
            ))
          ) : (
            <p>Không có data</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideSwiper;
