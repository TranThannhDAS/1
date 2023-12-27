"use client";
import Link from "next/link";
import React from "react";
import styles from "../../app/styleHomePage.module.scss";
import http from "@/utils/http";
import { SiShopee } from "react-icons/si";
import httpToken from "@/utils/httpToken";
import { Cookies } from "next-client-cookies";
import { AxiosError } from "axios";

const ProductAdmin: React.FC<{
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
  setLogin: (value: React.SetStateAction<boolean>) => void;
  cookies: Cookies;
  rout: string;
  setProductUp: (
    value: React.SetStateAction<
      | {
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
          FormCollectionAvatar: any;
          urlImage: {
            image: string;
            path: string;
          }[];
        }
      | undefined
    >
  ) => void;
  productUp:
    | {
        Id: number;
        Name: string;
        Price: string;
        FormCollectionAvatar: any;
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
      }
    | undefined;
  cate: {
    categoryId: number;
    categoryName: string;
  };
  setLoading: (value: React.SetStateAction<string>) => void;
  fetCateName(name: string, index?: number, search?: string): Promise<void>;
  setAdd: (value: React.SetStateAction<string>) => void;
  loading: string;
  nameRout: string;
}> = ({
  p,
  rout,
  setProductUp,
  setAdd,
  fetCateName,
  setLoading,
  loading,
  productUp,
  nameRout,
  cate,
  setLogin,
  cookies,
}) => {
  return (
    <Link
      key={p.id}
      href="/[slug]"
      as={`product/${rout?.replace(/\s+/g, "-").replace(/&/g, "-and-")}/${p.name
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")}/${p.id}`}
      className=" relative w-[250px] p-1 border shadow-[0_0_3px_#7a7a7a] hover:shadow-[0_0_10px] mb-4 mx-3 cursor-pointer"
    >
      <div
        className="absolute right-1 cursor-pointer top-0 text-sm w-auto px-3 py-1  bg-white z-10 shadow-[0_0_2px_#999999]"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setProductUp({
            Id: p.id,
            Name: p.name,
            Price: String(p.price),
            Description: p.description,
            Discount: String(p.price_After),
            categoryId: cate.categoryId,
            categoryName: cate.categoryName,
            FormCollection: p.urlImage[0]?.image,
            FormCollectionAvatar: null,
            path: p.urlImage[0]?.path,
            urlImage: p.urlImage,
            UrlShoppe: p.urlShoppe,
          });
          setAdd(rout);
        }}
      >
        Update
      </div>
      <div className="w-full h-[180px]">
        <img
          src={p.urlImage[0]?.image}
          alt={p.urlImage[0]?.path}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`mt-1 ${styles.containerProductTag}`}>
        <h3 className={`font-bold text-sm md:text-base ${styles.nameTag}`}>
          {p.name}
        </h3>
        <div className="w-full mt-1 md:mt-2 flex items-center border-b border-solid">
          <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
            {p.price.toLocaleString("en-US").replace(/,/g, ".")}đ
          </p>
          {p.price_After && (
            <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
              {p.price_After.toLocaleString("en-US").replace(/,/g, ".")}đ
            </p>
          )}
        </div>
        <div
          className={`text-[13px] h-[38px] md:text-[14px] mt-2 md:mt-3 ${styles.desTag}`}
          dangerouslySetInnerHTML={{ __html: p.description }}
        ></div>
      </div>
      <div className="my-2 flex items-center justify-center relative">
        <p
          className="absolute text-sm text-[crimson] top-[5px] left-[10px] "
          style={{ color: "crimson !important" }}
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
                    setLoading(String(p.id));
                    const del = await axio.delete(`Product/Delete/${p.id}`);
                    if (productUp) setProductUp(undefined);
                    fetCateName(nameRout);
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
          {loading === String(p.id) ? "deleting..." : "delete"}
        </p>
        <button className="text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md">
          View more
        </button>
        <div
          className="absolute top-[5px] text-[crimson] right-[30px] "
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

export default ProductAdmin;
