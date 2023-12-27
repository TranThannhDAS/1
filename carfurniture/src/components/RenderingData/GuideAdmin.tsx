"use client";
import httpToken from "@/utils/httpToken";
import moment from "moment";
import { Cookies } from "next-client-cookies";
import Link from "next/link";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import { AxiosError } from "axios";

const GuideAdmin: React.FC<{
  rout: string;
  g: {
    id: number;
    name: string;
    create_Date: string;
    content: string;
    urlImage: {
      image: string;
      path: string;
    }[];
  };
  setAdd: (value: React.SetStateAction<string>) => void;
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
  loading: string;
  setLogin: (value: React.SetStateAction<boolean>) => void;
  setLoading: (value: React.SetStateAction<string>) => void;
  setGuideUp: (
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
  nameRout: string;
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
  fetCateName(name: string, index?: number, search?: string): Promise<void>;
}> = ({
  rout,
  g,
  cookies,
  setNewsUp,
  fetCateName,
  setLoading,
  setLogin,
  setGuideUp,
  loading,
  nameRout,
  newsUp,
  setAdd,
}) => {
  return (
    <Link
      href="/[slug]"
      as={`guide/${rout.replace(/\s+/g, "-").replace(/&/g, "-and-")}/${g.name
        ?.replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${g.id}`}
      className="w-full flex flex-wrap md:flex-nowrap  mb-4 relative"
      key={g.id}
    >
      <div
        className="absolute left-[83px] cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          const accessToken = cookies.get("token");
          const refreshToken = cookies.get("refreshToken");
          try {
            if (accessToken && refreshToken) {
              const axio = httpToken(accessToken, refreshToken, cookies);
              if (typeof window !== "undefined") {
                const isD = window.confirm("Bạn có muốn xoá không?");
                if (isD && g.id) {
                  setLoading(String(g.id));
                  const del = await axio.delete(`Guide/Delete/${g.id}`);
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
        {loading === String(g.id) ? "deleting..." : "delete"}
      </div>
      <div
        className="absolute left-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setGuideUp(g);
          setAdd(rout);
        }}
      >
        Update
      </div>
      <div className="min-w-full h-[130px] md:min-w-[250px] md:h-[155px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
        <img
          src={g.urlImage[0]?.image}
          alt={g.urlImage[0]?.path}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="">
        <h3
          className="text-base md:text-[17px] font-bold overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-all",
          }}
        >
          {g.name}
        </h3>
        <p className="text-xs mt-1">
          {moment(g.create_Date).format("DD/MM/YYYY HH:MM:SS")}
        </p>
        <div
          className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: g.content }}
        ></div>
      </div>
    </Link>
  );
};

export default GuideAdmin;
