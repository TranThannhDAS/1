"use client";
import moment from "moment";
import Link from "next/link";
import React from "react";
import styles from "@/app/styleHomePage.module.scss";

const News: React.FC<{
  n: {
    id: number;
    name: string;
    create_Date: string;
    content: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  cate: string;
}> = ({ n, cate }) => {
  return (
    <Link
      key={n.id}
      href={`/[slug]`}
      as={`${cate?.replace(/\s+/g, "-").replace(/&/g, "-and-")}/${n.name
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${n.id}`}
      className="w-full flex flex-wrap min-[420px]:flex-nowrap mb-6"
    >
      <div className="min-w-full h-[130px] min-[420px]:min-w-[250px] md:h-[155px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
        <img
          src={n.urlImage[0]?.image}
          alt={n.urlImage[0]?.path}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-fit">
        <h3
          className="text-base md:text-[17px] font-bold overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-all",
          }}
        >
          {n.name}
        </h3>
        <p className="text-xs mt-1">
          {moment(n.create_Date).format("DD/MM/YYYY HH:MM:SS")}
        </p>
        <div
          className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: n.content }}
        ></div>
      </div>
    </Link>
  );
};

export default News;
