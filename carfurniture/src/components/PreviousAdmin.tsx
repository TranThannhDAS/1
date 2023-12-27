"use client";
import React from "react";
import styles from "./styleComponent.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import moment from "moment";
import { Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { CiSearch } from "react-icons/ci";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SiShopee } from "react-icons/si";
// import required modules
const PreviousAdmin: React.FC<{
  setPre: React.Dispatch<React.SetStateAction<boolean>>;
  product?: {
    Id: number;
    Name: string;
    Price: string;
    Discount: string;
    Description: string;
    UrlShoppe: string;
    categoryId: number;
    categoryName: string;
    path: string;
    FormCollection: any;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  news?: {
    id: number;
    name: string;
    create_Date: string;
    content: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
}> = ({ setPre, product, news }) => {
  return (
    <div
      className="w-full h-full fixed top-0 left-0  z-[999] flex justify-center bg-[#000000c9]"
      onClick={() => setPre(false)}
    >
      {news && (
        <div className="w-full min-[1200px]:w-[1200px] bg-white overflow-auto relative mt-15 border-t p-5">
          <div>
            <div className="w-full sm:w-[600px] h-[260px]">
              <img
                src={news.urlImage[0]?.image}
                alt={news.urlImage[0]?.path}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[90%] h-[90%]">
              <h3 className="text-base md:text-[17px] font-bold">
                {news.name}
              </h3>
              <p className="text-xs mt-1 ">
                {moment(news.create_Date).format("DD/MM/YYYY HH:MM:SS")}
              </p>
            </div>
            <div className="min-[1000px]:flex">
              <div className="mt-5">
                <div
                  className={`text-xs md:text-[13px] ${styles.dangerouslySet}`}
                  dangerouslySetInnerHTML={{ __html: news.content }}
                ></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
      {product && (
        <div className="w-[80%] min-[1200px]:w-[1200px] bg-white overflow-auto  relative mt-15 border-t p-5">
          <div>
            <div className="min-[1000px]:flex">
              <div className="w-full  min-[600px]:w-[500px]  ">
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  // breakpoints={{
                  //   0: {
                  //     slidesPerView: 3,
                  //     spaceBetween: 10,
                  //   },
                  //   500: {
                  //     slidesPerView: 4,
                  //     spaceBetween: 20,
                  //   },
                  //   800: {
                  //     slidesPerView: 5,
                  //     spaceBetween: 30,
                  //   },
                  //   1200: {
                  //     slidesPerView: 6,
                  //     spaceBetween: 40,
                  //   },
                  // }}
                  modules={[Pagination]}
                  className={`${styles.mySwiper} h-[300px] `}
                >
                  {product.urlImage.map((f) => (
                    <SwiperSlide key={f.path}>
                      <img
                        src={f.image}
                        alt={f.path}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>{" "}
                <Swiper
                  slidesPerView={product.urlImage.length}
                  pagination={{
                    dynamicBullets: true,
                  }}
                  spaceBetween={30}
                  // breakpoints={{
                  //   0: {
                  //     slidesPerView: 3,
                  //     spaceBetween: 10,
                  //   },
                  //   500: {
                  //     slidesPerView: 4,
                  //     spaceBetween: 20,
                  //   },
                  //   800: {
                  //     slidesPerView: 5,
                  //     spaceBetween: 30,
                  //   },
                  //   1200: {
                  //     slidesPerView: 6,
                  //     spaceBetween: 40,
                  //   },
                  // }}
                  modules={[Pagination]}
                  className={`${styles.mySwiper} w-full h-[100px] mt-3`}
                >
                  {product.urlImage.map((f) => (
                    <SwiperSlide key={f.path} className="cursor-pointer">
                      <img
                        src={f.image}
                        alt={f.path}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-1 min-[1000px]:ml-3 ">
                <h3
                  className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                >
                  {product.Name}
                </h3>
                <div className="w-full mt-1 md:mt-2 flex  items-center border-b border-solid">
                  <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                    {product.Price.toLocaleString().replace(/,/g, ".")}đ
                  </p>
                  {product.Discount && (
                    <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                      {product.Discount.toLocaleString().replace(/,/g, ".")}đ
                    </p>
                  )}
                </div>
                <div className="mt-3 flex ">
                  <a
                    href={"#"}
                    target="_blank"
                    className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                  >
                    <div className="flex text-[20px] text-[#4993de] mr-2">
                      <PiMessengerLogoLight />
                    </div>{" "}
                    Messenger
                  </a>
                  <a
                    href={`#`}
                    className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] bg-slate-700 flex items-center"
                  >
                    <div className="flex text-[20px] text-[#57eb57] mr-2">
                      <CiPhone />
                    </div>{" "}
                    00000000000
                  </a>
                  <a
                    href={"#"}
                    target="_blank"
                    className="w-fit mr-2 my-2 text-sm text-white py-2 px-5 rounded-[20px] flex items-center bg-slate-700"
                  >
                    <div className="flex text-[#ff6f6f] text-[20px] mr-2">
                      {" "}
                      <SiShopee />
                    </div>{" "}
                    Shoppe
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-semibold">Mô tả</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.Description }}
                className={`text-xs md:text-[13px] w-full mb-5 ${styles.dangerouslySet}`}
              ></div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default PreviousAdmin;
