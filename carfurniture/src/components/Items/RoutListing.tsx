"use client";
import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "../../app/styleHomePage.module.scss";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import http from "@/utils/http";
import { SiShopee } from "react-icons/si";
const RoutListing: React.FC<{
  dataList?: string[];
  currentPath: string;
  title: string;
  defaultR?: string;
  cate?:
    | {
        categoryName: string;
        categoryId: number;
      }[];
  category: string;
}> = ({ currentPath, title, defaultR, cate, dataList, category }) => {
  const [dataHasSeen, setDataHasSeen] = useState<
    | {
        product: {
          id: number;
          name: string;
          price: number;
          price_After: number;
          description: string;
          urlShoppe: string;
        };
        categoryName: string;
        urlImage: { image: string; path: string }[];
        info_in_AboutUs: [{ url_Mess: string; phone: string }];
      }[]
  >([]);
  const pathname = usePathname();
  const rr = useRef<boolean>(false);
  const [routs, setRouts] = useState<string[]>([]);
  useEffect(() => {
    const d: any = [
      title,
      pathname.split(`/`)[2]?.replace(/-/g, " ")
        ? decodeURIComponent(pathname.split(`/`)[2])?.replace(/-/g, " ")
        : defaultR,
    ];
    setRouts(d);
    rr.current = true;
    const hasSeen: number[] = JSON.parse(
      window.localStorage.getItem("product") ?? JSON.stringify([])
    );
    const getProduct = async () => {
      if (hasSeen.length === 1) {
        const re1 = await http.get(`Product/GetByID/${hasSeen[0]}`);
        setDataHasSeen([re1.data]);
      }
      if (hasSeen.length === 2) {
        const re1 = await http.get(`Product/GetByID/${hasSeen[0]}`);
        const re2 = await http.get(`Product/GetByID/${hasSeen[1]}`);
        setDataHasSeen([re1.data, re2.data]);
      }
    };
    getProduct();
  }, []);
  useEffect(() => {
    routs[0] = title;
    if (routs.length > 1 || rr.current) {
      if (!pathname.split(`${currentPath}/`)[1])
        setRouts((pre) => pre.filter((r, index) => index !== 1));
      if (
        decodeURIComponent(pathname)
          ?.replace(/-/g, " ")
          .split(routs[1] ?? "")[1]
      ) {
        if (pathname.split(`/`)[2]) {
          routs[1] = decodeURIComponent(pathname.split(`/`)[2])?.replace(
            /-/g,
            " "
          );
          routs[2] = decodeURIComponent(pathname.split(`/`)[3])?.replace(
            /-/g,
            " "
          );
          setRouts(routs);
        }

        setLoad(!load);
      } else {
        routs[1] = decodeURIComponent(pathname.split(`/`)[2])?.replace(
          /-/g,
          " "
        );

        setRouts(routs.filter((r, index) => index !== 2));
        setLoad(!load);
      }
    }
  }, [pathname, rr.current]);
  const [load, setLoad] = useState(false);
  const handleRount = (vl: string) => {
    if (routs.length >= 2) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    setLoad(!load);
  };
  const f = routs[1] ?? "";
  return (
    <div className={`px-5 w-full ${routs[3] ? "" : "md:w-[400px]"} `}>
      <div className="w-full my-3 mb-4">
        <Routing routs={routs} pathname={pathname} />
      </div>
      {!routs[2] && (
        <div
          className={`w-full mb-15 flex-wrap md:flex-nowrap ${
            routs.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
            <div className="w-full">
              <Listing
                onClick={handleRount}
                choice={f}
                category={category}
                data={cate ?? []}
                default={currentPath ?? defaultR}
              />
            </div>
          </div>
          <h3 className="w-full md:hidden text-center border-b">
            {currentPath} {routs[1]}
          </h3>
        </div>
      )}
      {category === "product" && (
        <div className="w-[80%] hidden xl:block ">
          {!routs[2] &&
            dataHasSeen.map((p) => (
              <div
                key={p.product.id}
                className="w-[200px] h-auto m-3 md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer"
              >
                <Link href="/[slug]" as={`${p.categoryName}/${p.product.id}`}>
                  <div className="w-full h-[200px] md:h-[230px]">
                    <img
                      src={p.urlImage[0]?.image}
                      alt={p.urlImage[0]?.path}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`mt-1 ${styles.containerProductTag}`}>
                    <h3
                      className={`font-bold text-sm md:text-base ${styles.nameTag}`}
                    >
                      {p.product.name}
                    </h3>
                    <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
                      <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                        {p.product.price}đ
                      </p>
                      {p.product.price_After && (
                        <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                          {p.product.price_After}đ
                        </p>
                      )}
                    </div>
                    <div
                      className={`text-[13px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
                      dangerouslySetInnerHTML={{
                        __html:
                          ' <strong className="text-[crimson]">*</strong>' +
                          p.product.description,
                      }}
                    ></div>
                  </div>
                  <div className="my-2 flex items-center justify-center relative">
                    <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
                      View more
                    </button>
                    <a
                      href={p.product.urlShoppe}
                      className="absolute top-[5px] right-[10px] md:right-[40px]"
                      style={{ color: "crimson !important" }}
                    >
                      <SiShopee />
                    </a>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RoutListing;
