"use client";
import httpToken from "@/utils/httpToken";
import moment from "moment";
import { Cookies } from "next-client-cookies";
import Link from "next/link";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import { AxiosError } from "axios";

const NewsAdmin: React.FC<{
  bl: {
    id: number;
    name: string;
    create_Date: string;
    content: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  rout: string;
  setLogin: (value: React.SetStateAction<boolean>) => void;
  cookies: Cookies;
  setNewsUp: (
    value: React.SetStateAction<
      | {
          id: number;
          name: string;
          create_Date: string;
          content: string;
          urlImage: {
            image: string;
            path: string;
          }[];
        }
      | undefined
    >
  ) => void;
  setPre: (value: React.SetStateAction<boolean>) => void;
  setLoading: (value: React.SetStateAction<string>) => void;
  fetCateName(name: string, index?: number, search?: string): Promise<void>;
  nameRout: string;
  setAdd: (value: React.SetStateAction<string>) => void;
  newsUp:
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: {
          image: string;
          path: string;
        }[];
      }
    | undefined;
  loading: string;
}> = ({
  bl,
  rout,
  setPre,
  setLoading,
  fetCateName,
  cookies,
  nameRout,
  setNewsUp,
  setAdd,
  newsUp,
  loading,
  setLogin,
}) => {
  return (
    <Link
      href="/[slug]"
      as={`news/${rout?.replace(/\s+/g, "-").replace(/&/g, "-and-")}/${bl.name
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${bl.id}`}
      className="w-full flex flex-wrap md:flex-nowrap  mb-4 relative"
      key={bl.id}
      onClick={() => {
        setPre(true);
      }}
    >
      <div
        className="absolute left-[83px] cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const accessToken = cookies.get("token");
          const refreshToken = cookies.get("refreshToken");
          try {
            if (accessToken && refreshToken) {
              const axio = httpToken(accessToken, refreshToken, cookies);
              if (typeof window !== "undefined") {
                const isD = window.confirm("Bạn có muốn xoá không?");
                if (isD) {
                  setLoading(String(bl.id));
                  const del = await axio.delete(`Blog/Delete/${bl.id}`);
                  fetCateName(nameRout);
                  if (newsUp) setNewsUp(undefined);
                  setLoading("");
                }
              }
            }
          } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 401) {
              cookies.remove("token");
              cookies.remove("refreshToken");
              setLogin(true);
            }
          }
        }}
      >
        {loading === String(bl.id) ? "deleting..." : "delete"}
      </div>
      <div
        className="absolute left-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setNewsUp(bl);
          setAdd(rout);
        }}
      >
        Update
      </div>
      <div className="min-w-full h-[130px] md:min-w-[250px] md:h-[155px]  mr-3 md:mr-5">
        <img
          src={bl.urlImage[0]?.image}
          alt={bl.urlImage[0]?.path}
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
          {bl.name}
        </h3>
        <p className="text-xs mt-1">
          {moment(bl.create_Date).format("DD/MM/YYYY HH:MM:SS")}
        </p>
        <div
          className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: bl.content }}
        ></div>
      </div>
    </Link>
  );
};

export default NewsAdmin;
