"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowAltCircleRight } from "react-icons/fa";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Images } from "@/asset/image";
import styles from "./styleSlide.module.scss";
import Link from "next/link";
export default function SlideHome() {
  const [change, setChange] = useState<{ current: number; next: number }>({
    current: 0,
    next: 0,
  });
  const textV = [
    {
      id: 1,
      val: [
        "THẺ BẢN ĐỒ CHÍNH HÃNG XE MAZDA (MAZDA NAVIGATION)",
        "Thẻ chính hãng có license bản quyền, không mất bảo hành xe",
        "Hiển thị Cảnh báo tốc độ và Điều hướng trên Hắt kính (HUD)",
        "Định vị chính xác vị trí của xe khi di chuyển, kiểm soát tốc độ và xác định đúng điểm dừng đỗ.",
        "Cảnh báo giới hạn tốc độ, cảnh báo khi xe đi vào những cung đường nguy hiểm.",
        "Có thể chạy offline bằng định vị vệ tinh, k phụ thuộc vào kết nối mạng",
        "Click để xem chi tiết sản phẩm",
      ],
    },
    {
      id: 2,
      val: [
        "VIỆT HÓA, KÍCH HOẠT TÍNH NĂNG ẨN XE MAZDA",
        "Font tiếng việt cho hệ thống Mazda connect",
        "Kích hoạt và update bản đồ Mazda navigation chính hãng.",
        "Kích hoạt xem Video qua usb (mp4, Avi,...)",
        "Cài đặt hình nền, ảnh gia đình lên giao diện màn hình xe",
        "Kích hoạt sử dụng cảm ứng khi xe di chuyển",
        "Click để xem chi tiết sản phẩm",
      ],
    },
    {
      id: 3,
      val: [
        "NÂNG CẤP KIT CARPLAY CHÍNH HÃNG MAZDA",
        "Kết nối điện thoại iphone thông qua giao thức carplay",
        "Kết nối điện thoại hđh Android thông qua Android auto",
        "Kết nối với mọi loại Android box đang có trên thị trường",
        "Sử dụng bản đồ google map và vietmap live dẫn đường thông minh",
        "Xem youtube với ios đã jailbreak hoặc android cài femata",
        "Click để xem chi tiết sản phẩm",
      ],
    },
    {
      id: 4,
      val: [
        " ANDROID BOX DÀNH CHO XE MAZDA",
        "Chip 8 nhân mạnh mẽ, Cấu hình Ram tùy chọn hợp lý",
        "Sử dụng hệ điều hành Android mới nhất",
        "Tặng vietmap S2 dẫn đường có cảnh báo giao thông",
        "Tặng Youtube premium xem youtube ko quảng cáo",
        "Tùy chọn sử dụng wifi hoặc sim mạng tiện lợi",
        "Click để xem chi tiết sản phẩm",
      ],
    },
    {
      id: 5,
      val: [
        " CAMERA 3 MẮT CHO XE MAZDA (CÓ MAZDA CONNECT)",
        "Bộ cam tùy chọn phiên bản mắt thường hoặc mắt rộng",
        "Cắm zắc zin hoàn toàn, không cắt chích hệ thống điện của xe",
        "Tích hợp hiển thị camera trước khi vào số D ",
        "ích hợp tự động hiển thị cam gương theo xinhan",
        "Chỉ hiện thị camera khi xe di chuyển với tốc độ dưới 15km/h",
        "Click để xem chi tiết sản phẩm",
      ],
    },
  ];

  const [renderedTexts, setRenderedTexts] = useState<any>([]);
  const renderedTextsRef = useRef<{
    one: any;
    two: any;
    three: any;
  }>({
    one: [],
    two: [],
    three: [],
  });
  const Tm = useRef<NodeJS.Timeout[]>([]);
  useEffect(() => {
    const delay = 300; // Adjust the delay time (in milliseconds) between each text
    const texts: any = [];

    textV[change.current].val.forEach((text, index, arr) => {
      const R = setTimeout(() => {
        texts.push(
          index !== 0 ? (
            index + 1 === arr.length ? (
              <Link
                href={`/product/${process.env.DEFAULT_PRODUCT}/${arr[0]
                  ?.replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}`}
                key={index + text}
                className={`${styles.animationSlideText} flex text-[10px] text-white bg-[#00a5b6] items-center  w-max md:text-sm  relative top-[-10px] ml-2 mb-1   px-[10px] py-[3px] rounded-[5px] `}
              >
                <p className="hover:text-[#0065bd]">
                  {text?.replace(/-/g, " ")}
                </p>
              </Link>
            ) : (
              <div
                key={index + text}
                className={`${styles.animationSlideText} flex text-[10px] items-center  w-max md:text-sm  relative top-[-10px] ml-2 mb-1 bg-[aliceblue]  px-[8px] py-[2px] rounded-[5px] `}
              >
                <div className="flex items-center text-[green] mr-1">
                  <FaArrowAltCircleRight />
                </div>
                <p className="hover:text-[#0065bd]">
                  {text?.replace(/-/g, " ")}
                </p>
              </div>
            )
          ) : (
            <h3
              key={index + text}
              className={`${styles.animationSlideTextH3} text-[18px] md:text-[20px] xl:text-[22px] font-semibold mb-3  w-max xl:bg-inherit px-[10px] py-[2px] rounded-[5px] `}
            >
              {text}
            </h3>
          )
        );

        setRenderedTexts([...texts]);
      }, index * delay);
      Tm.current.push(R);
    });
    return () => {
      Tm.current.map((tm) => clearTimeout(tm));
    };
  }, [change]);
  const sildeData = [
    {
      id: 0,
      element: (
        <div className="w-full h-[450px]  flex relative flex-wrap sm:flex-nowrap">
          <div className="xl:w-[52%] w-[100%] sm:w-[60%] relative">
            <div className="absolute right-[50%] left-[42%] top-[20%] sm:top-[91px]  sm:left-[69%] md:left-[52%] translate-x-[-50%] w-[340px] sm:w-[465px]">
              {renderedTexts}
            </div>
          </div>
          <div className="sm:w-5/12 w-full xl:w-[49%]   flex justify-start overflow-hidden relative z-10">
            <div
              className={` w-full sm:w-auto h-full xl:h-[90%]  sm:flex-wrap  xl:flex-nowrap absolute top-0 right-0 p-5  flex  items-center`}
            >
              <div
                className={`${styles.slideImageOneChild1} h-full sm:h-1/2 w-4/5 min-w-1/2 xl:w-full xl:h-[80%] p-[9px] relative`}
              >
                <Image
                  src={Images.slideTwoOne}
                  alt="mazdashop.vn"
                  className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                />
              </div>
              <div
                className={`${styles.slideImageOneChild2} h-full sm:h-1/2 w-4/5 min-w-1/2 xl:w-full xl:h-[80%] p-[9px] relative`}
              >
                <Image
                  src={Images.slideTwoTwo}
                  alt="mazdashop.vn"
                  className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      element: (
        <div className="w-full h-[450px]  flex relative flex-wrap sm:flex-nowrap">
          <div className="xl:w-[52%] w-[100%] sm:w-[60%] relative">
            <div className="absolute right-[50%] left-[48%] top-[20%] sm:top-[91px]  sm:left-[69%] md:left-[58%] translate-x-[-50%] w-[340px] sm:w-[465px]">
              {renderedTexts}
            </div>
          </div>
          <div className="sm:w-5/12 w-full xl:w-[52%]   flex justify-start overflow-hidden relative z-10">
            <div
              className={` w-full h-[90%]  sm:flex-wrap  xl:flex-nowrap absolute top-0 right-0 p-5  flex  items-center`}
            >
              <div
                className={`${styles.slideImageOneChild1} h-full sm:h-[55%] xl:h-[75.5%] w-4/5 min-w-1/2 xl:w-full  p-[9px] relative`}
              >
                <Image
                  src={Images.slideOneOne}
                  alt="mazdashop.vn"
                  className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                />
              </div>
              <div
                className={`${styles.slideImageOneChild2} h-full sm:h-[55%] xl:h-[75.5%] w-4/5 min-w-1/2 xl:w-full  p-[9px] relative`}
              >
                <Image
                  src={Images.slideOneTwo}
                  alt="mazdashop.vn"
                  className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      element: (
        <div className="w-full h-[450px]  flex relative flex-wrap md:flex-nowrap">
          <div className="w-full md:w-[60%] xl:w-1/2 relative">
            <div className="absolute top-[48px] md:top-[91px] right-[50%] left-[70%] md:left-[50%] translate-x-[-50%] w-[465px]">
              {renderedTexts}
            </div>
          </div>
          <div className="w-full md:w-[40%] xl:w-1/2 flex justify-center md:justify-start overflow-hidden relative z-10">
            <div
              className={` marker:w-full h-full absolute top-0 xl:right-[115px] p-5  flex flex-wrap items-center`}
            >
              <div
                className={`${styles.slideImageOneChild1} min-w-full w-full h-[95%] mr-10 py-2 relative`}
              >
                <Image
                  src={Images.slideThreeOne}
                  alt="mazdashop.vn"
                  className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      element: (
        <SwiperSlide key={3}>
          <div className="w-full h-[450px]  flex relative flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[60%] xl:w-1/2 relative">
              <div className="absolute top-[48px] md:top-[91px] right-[50%] left-[70%] md:left-[50%] translate-x-[-50%] w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-full md:w-[40%] xl:w-1/2 flex justify-center md:justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 xl:right-[115px] p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-full w-full h-[95%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideFourOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ),
    },
    {
      id: 4,
      element: (
        <SwiperSlide key={4}>
          <div className="w-full h-[450px]  flex relative flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[60%] xl:w-1/2 relative">
              <div className="absolute top-[48px] md:top-[91px] right-[50%] left-[70%] md:left-[50%] translate-x-[-50%] w-[465px]">
                {renderedTexts}
              </div>
            </div>
            <div className="w-full md:w-[40%] xl:w-1/2 flex justify-center md:justify-start overflow-hidden relative z-10">
              <div
                className={` marker:w-full h-full absolute top-0 xl:right-[115px] p-5  flex flex-wrap items-center`}
              >
                <div
                  className={`${styles.slideImageOneChild1} min-w-full w-full h-[95%] mr-10 py-2 relative`}
                >
                  <Image
                    src={Images.slideFiveOne}
                    alt="mazdashop.vn"
                    className={`${styles.slideOneOne} w-full h-full object-cover rounded-md`}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ),
    },
  ];

  return (
    <div className={`w-[100%] ${styles.bk}`}>
      <Swiper
        pagination={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        navigation={true}
        // autoplay={{
        //   delay: 5500,
        //   disableOnInteraction: false,
        // }}
        onSlideChange={(e: any) =>
          setChange({ ...change, current: e.activeIndex })
        }
      >
        {sildeData.map((r, index) => {
          if (r.id === change.current) {
            return <SwiperSlide key={r.id}>{r.element}</SwiperSlide>;
          }
          return <SwiperSlide key={r.id + index + Math.random()}></SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
