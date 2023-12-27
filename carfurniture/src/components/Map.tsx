"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { PiMessengerLogoLight } from "react-icons/pi";
import http from "@/utils/http";
import Link from "next/link";
import styles from "./styleComponent.module.scss";
import { useCookies } from "next-client-cookies";
import { FaFacebook } from "react-icons/fa";

const Map = () => {
  const cookies = useCookies();
  const [data, setData] = useState<{
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    url_Mess: string;
    google_map: string;
  }>();
  const [cc, setCc] = useState(false);
  const fet = async () => {
    const res = await http.get<(typeof data)[]>("AboutUs/GetAll");
    setData(res.data[0]);
  };
  useEffect(() => {
    fet();
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    if (token && refreshToken) setCc(true);
  }, []);

  return (
    <div
      className={`flex  text-white md:relative right-[76px] justify-center w-fit flex-wrap ${styles.font}`}
    >
      <div className="w-[200px] h-[100px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[200px] bg-white mr-3 ">
        <iframe
          src={data?.google_map}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-[15px] sm:text-[17px] sm:mb-2">
          Liên hệ
        </h3>
        <h3 className="font-semibold mb-1 text-[14px] sm:text-[15px] opacity-[0.7]">
          {data?.name}
        </h3>
        <h3 className="font-semibold mb-[8px] text-[13.5px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <MdLocationOn />
          </div>
          Địa chỉ: <p className="font-light ml-1 mx-2">{data?.address}</p>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[13px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <FaPhone />
          </div>
          SDT:{" "}
          <a href="tel:0974034981" className="font-light mx-2">
            {data?.phone}
          </a>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[13px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <AiOutlineMail />
          </div>
          Email:{" "}
          <a
            href="mailto:nguyentronghung05072003@gmail.com"
            className="font-light mx-2"
          >
            {data?.email}
          </a>
        </h3>
        <h3 className="font-semibold mb-[8px] text-[13px] w-fit flex opacity-[0.7]">
          <div className="flex items-center mr-2">
            <FaFacebook />
          </div>
          FanPage:{" "}
          <a
            href="https://www.facebook.com/mazdashop.vnn"
            className="font-light mx-2 hover:text-[#1c8ff3]"
          >
            https://www.facebook.com/mazdashop.vnn
          </a>
        </h3>
      </div>
      <a
        href={`tel:${data?.phone}`}
        className={`fixed bottom-[10px] md:bottom-5 left-2 flex items-center cursor-pointer ${styles.hover}`}
      >
        <div className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full bg-[#5BB006] flex items-center justify-center z-10 text-white">
          <FaPhone />
        </div>
        <h3 className="text-[13px] md:text-[15px]  bg-[#0099e6] rounded-[20px] font-semibold py-1 px-[11px] pl-[34px] relative right-[29px] text-white">
          {data?.phone}
        </h3>
      </a>
      <a
        href={data?.url_Mess}
        target="_blank"
        className={`fixed bottom-[50px] md:bottom-[78px] left-2 flex items-center cursor-pointer ${styles.hover}`}
      >
        <div className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] text-[20px] md:text-[30px] rounded-full bg-[#1c8ff3] flex items-center justify-center z-10 text-white">
          <PiMessengerLogoLight />
        </div>
      </a>
      {cc && (
        <Link
          href="/admin"
          className="fixed bottom-[35px] right-[35px] flex items-center  cursor-pointer"
        >
          <h3 className="text-[13px] md:text-[15px] text-center bg-[#0099e6] rounded-[10px] font-semibold py-2 px-[15px]  text-white">
            Admin
          </h3>
        </Link>
      )}
    </div>
  );
};

export default Map;
