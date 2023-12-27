"use client";
import Link from "next/link";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import { SiShopee } from "react-icons/si";

const Product: React.FC<{
  p: {
    id: number;
    name: string;
    price: number;
    price_After: number;
    description: string;
    urlShoppe: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  cate: string;
}> = ({ p, cate }) => {
  return (
    <Link
      key={p.id}
      href="/[slug]"
      as={`${cate?.replace(/\s+/g, "-").replace(/&/g, "-and-")}/${p.name
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${p.id}`}
      className="w-[200px] m-3 md:w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 cursor-pointer"
      onClick={() => {
        if (typeof localStorage !== "undefined") {
          const h: number[] = JSON.parse(
            localStorage.getItem("product") ?? JSON.stringify([])
          );

          if (h.some((m) => m !== p.id) || !h.length) {
            h.unshift(p.id);
            const newH = h.filter((s, index) => index !== 2);
            localStorage.setItem("product", JSON.stringify(newH));
          }
        }
      }}
    >
      <div className="w-full h-[200px] md:h-[230px]">
        {p.urlImage && (
          <img
            src={p.urlImage[0]?.image}
            alt={p.urlImage[0]?.path}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className={`mt-1 ${styles.containerProductTag}`}>
        <h3 className={`font-bold text-sm md:text-base ${styles.nameTag}`}>
          {p.name}
        </h3>
        <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
          <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
            {p.price}đ
          </p>
          {p.price_After && (
            <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
              {p.price_After}đ
            </p>
          )}
        </div>
        <div
          className={`text-sm md:text-base h-[43px]  mt-2 overflow-hidden ${styles.description}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: p.description }}
        ></div>
      </div>
      <div className="my-2 flex items-center justify-center relative">
        <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
          View more
        </button>
        <div
          className="absolute top-[5px] right-[10px] md:right-[40px] text-[crimson]"
          style={{ color: "crimson !important" }}
          onClick={(e) => {
            e.preventDefault();
            window.open(p.urlShoppe, "_blank");
          }}
        >
          <SiShopee />
        </div>
      </div>
    </Link>
  );
};

export default Product;
