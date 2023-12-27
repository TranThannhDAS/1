"use client";
import { Images } from "@/asset/image";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import http from "@/utils/http";
import Login from "./Login";
import moment from "moment";
import { redirect, usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import httpToken from "@/utils/httpToken";
const Header = () => {
  const [session, setSession] = useState<boolean>(false);
  const cookies = useCookies();
  const [active, setActive] = useState<string>("");
  const [firstCate, setFirstCate] = useState<{
    product: string;
    news: string;
    guide: string;
  }>({ product: "", news: "", guide: "" });
  const router = useRouter();
  const [auth, setAuth] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    getData();
    // your code
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    setActive(pathname);
    if (!token || !refreshToken) setAuth(true);
    if (typeof document !== "undefined") {
      const hear = document.querySelectorAll(".header_home");

      Array.from(hear).map((h) => {
        h.addEventListener("click", (e: any) => {
          Array.from(hear).map((h: any) => {
            h.style.color = "#3a3b3b";
          });
          if (e.target) e.target.style.color = "#42aaea";
        });
      });
    }
  }, []);
  useEffect(() => {
    if (active) {
      setActive(pathname);
    }
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    setActive(pathname);
    if (!token || !refreshToken) setAuth(true);
  }, [pathname]);
  const getData = async () => {
    const res = await http.get("CategoryType/GetAll");

    const res1: any = await http.get(`Category/GetAll/${res.data[0]?.name}`);
    const res2 = await http.get(`Category/GetAll/${res.data[1]?.name}`);
    const res3 = await http.get(`Category/GetAll/${res.data[2]?.name}`);
    setFirstCate({
      product: res1.data[0]?.categoryName,
      news: res2.data[0]?.categoryName,
      guide: res3.data[0]?.categoryName,
    });
  };

  const [onTab, setOnTab] = useState<boolean>(false);
  console.log(
    active,
    "active",
    !(active.indexOf("product") > 0) &&
      !(active.indexOf("news") > 0) &&
      !(active.indexOf("guide") > 0),
    active.indexOf("news")
  );

  return (
    <div className="w-full  bg-white flex justify-center h-auto sm:h-[125px] pt-4 border-b-2">
      {onTab && (
        <div
          className="w-full h-full absolute top-0 flex justify-end z-10 bg-[#000000ba]"
          onClick={() => setOnTab(false)}
        >
          <div
            className="h-full  w-[80%] shadow-[0_0_3px_#4e4e4e] bg-white "
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: "'Mazda patrick', sans-serif !important" }}
          >
            <div className=" w-full flex flex-wrap mt-[15px]">
              <Link
                href="/"
                className={`header_home w-full    my-[2px] text-sm sm:text-base mx-4 max-sm:my-1 whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea] ${
                  !(active.indexOf("product") > 0) &&
                  !(active.indexOf("news") > 0) &&
                  !(active.indexOf("guide") > 0)
                    ? "text-[#42aaea]"
                    : "text-[#3a3b3b]"
                }`}
              >
                Trang chủ
              </Link>
              <Link
                href={`/news/${firstCate.news
                  ?.replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}`}
                className={`header_home w-full  ${
                  active.indexOf("news") > 0
                    ? "text-[#42aaea]"
                    : "text-[#3a3b3b]"
                } text-sm sm:text-base mx-4 max-sm:my-1 whitespace-pre-wrap my-[2px] font-medium cursor-pointer hover:text-[#42aaea]`}
              >
                Tin tức
              </Link>
              <Link
                href={`/product/${firstCate.product
                  ?.replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}`}
                className={`header_home w-full  ${
                  active.indexOf("product") > 0
                    ? "text-[#42aaea]"
                    : "text-[#3a3b3b]"
                }  text-sm sm:text-base mx-4 max-sm:my-1 whitespace-pre-wrap my-[2px] font-medium cursor-pointer hover:text-[#42aaea]`}
              >
                Danh sách sản phẩm
              </Link>
              <Link
                href={`/guide/${firstCate.guide
                  ?.replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}`}
                className={`header_home w-full  ${
                  active.indexOf("guides") > 0
                    ? "text-[#42aaea]"
                    : "text-[#3a3b3b]"
                }  text-sm sm:text-base mx-4 max-sm:my-1 my-[2px] whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]`}
              >
                Hưỡng dẫn sử dụng
              </Link>
              <div
                onClick={() => setOnTab(false)}
                className="header_home w-full flex  text-[#3a3b3b] text-sm sm:text-base mx-4 max-sm:my-1 whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]"
              >
                Ẩn thanh Tab{" "}
                <div className="flex items-center">
                  <IoMdClose />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-[80%] max-sm:w-full h-auto flex justify-between items-center sm:h-10 relative sm:pl-[93px] flex-wrap">
        <div className="flex max-sm:pl-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mr-2.5 sm:absolute left-0">
            <Image
              src={Images.logo}
              alt="car"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <a href="/" className="font-bold text-lg">
              Mazdashop.vn
            </a>
            <p className="text-xs">chuyên cung cấp các đồ chơi xe chính hãng</p>
          </div>
        </div>
        {auth ? (
          <div
            className="flex max-sm:absolute max-sm:top-[5px] max-sm:right-11  cursor-pointer"
            onClick={() => setSession(true)}
          >
            <p className="text-sm">Đăng nhập</p>
          </div>
        ) : (
          <div
            className="flex max-sm:absolute max-sm:top-[5px] max-sm:right-11 cursor-pointer "
            onClick={async () => {
              const accessToken = cookies.get("token");
              const refreshToken = cookies.get("refreshToken");
              if (accessToken && refreshToken) {
                const axio = httpToken(accessToken, refreshToken, cookies);
                const userName = cookies.get("userName");
                const token = cookies.get("token");
                const res = await axio.get(`User/Logout/${userName}`);
                cookies.remove("token");
                cookies.remove("refreshToken");
                setAuth(true);
                router.refresh();
              }
            }}
          >
            <p className="text-sm">Đăng xuất</p>
          </div>
        )}
        <div
          style={{ fontFamily: "Mazda patrick, sans-serif !important" }}
          className="hidden md:flex w-full max-sm:pl-[78px] max-sm:flex-wrap max-sm:justify-start sm:w-auto sm:absolute -bottom-11 left-[19%] md:left-[30%] justify-around sm:mt-3"
        >
          <Link
            href="/"
            className={`header_home ${
              !(active.indexOf("product") > 0) &&
              !(active.indexOf("news") > 0) &&
              !(active.indexOf("guide") > 0)
                ? "text-[#42aaea]"
                : "text-[#3a3b3b] "
            } text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]`}
          >
            Trang chủ
          </Link>
          <Link
            href={`/news/${firstCate.news?.replace(/\s+/g, "-")}`}
            className={`header_home  ${
              active.indexOf("news") > 0 ? "text-[#42aaea]" : "text-[#3a3b3b]"
            } text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]`}
          >
            Tin tức
          </Link>
          <Link
            href={`/product/${firstCate.product?.replace(/\s+/g, "-")}`}
            className={`header_home  ${
              active.indexOf("product") > 0
                ? "text-[#42aaea]"
                : "text-[#3a3b3b]"
            }  text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]`}
          >
            Danh sách sản phẩm
          </Link>
          <Link
            href={`/guide/${firstCate.guide?.replace(/\s+/g, "-")}`}
            className={`header_home ${
              active.indexOf("guide") > 0 ? "text-[#42aaea]" : "text-[#3a3b3b]"
            }  text-sm sm:text-base mx-4 max-sm:my-1 w-max whitespace-pre-wrap font-medium cursor-pointer hover:text-[#42aaea]`}
          >
            Hưỡng dẫn sử dụng
          </Link>
        </div>

        <div
          className="flex w-full pr-[20px] pb-2 text-[20px] justify-end md:hidden"
          onClick={() => setOnTab(!onTab)}
        >
          <PiDotsNineBold />
        </div>
      </div>
      {session && <Login setSession={setSession} />}
    </div>
  );
};

export default Header;
