"use client";

import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import styles from "../../news/styleNews.module.scss";
import http from "@/utils/http";
import moment from "moment";
import Link from "next/link";
import { MdSkipPrevious } from "react-icons/md";
import { BiSkipNext } from "react-icons/bi";

const page = (props: { params: { cate: string } }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const getNews = async (cate: string, index = 1, name?: string) => {
    setLoading(true);
    if (name) {
      setLoadingSearch(true);
      const res = await http.post("Guide/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_CategoryName: cate,
        search_Name: name,
      });
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
      setLoadingSearch(false);
    } else {
      const res = await http.post("Guide/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_CategoryName: cate,
      });
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews(decodeURIComponent(props.params.cate).replace(/-/g, " "));
  }, []);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    getNews(
      decodeURIComponent(props.params.cate).replace(/-/g, " "),
      1,
      search
    );
  };
  const [additionalPage, setAdditionalPage] = useState<number>(1);
  let managerIndex = false;
  let isIndex = false;
  return (
    <div className="w-full md:w-[60%] p-3">
      <div className="w-full mb-4">
        <InputSearch
          placeholder={decodeURIComponent(props.params.cate).replace(/-/g, " ")}
          onChange={handleSearch}
          onClick={handleClick}
          loading={loadingSearch}
        />
      </div>
      <div className="w-full">
        <div className="w-full h-fit flex justify-center pb-1 border-b mb-1">
          {pageIndex > 1 &&
            Array.from({ length: pageIndex }, (_, index) => index + 1).map(
              (p) => {
                if (p > additionalPage * 5 && !isIndex) {
                  isIndex = true;
                  managerIndex = true;
                } else {
                  managerIndex = false;
                }
                return (
                  <div key={p} className="flex w-auto h-fit">
                    {additionalPage > 1 && additionalPage === p && (
                      <div
                        onClick={() =>
                          setAdditionalPage((pre) =>
                            pre - 1 < 1 ? 1 : pre - 1
                          )
                        }
                        className="flex items-center cursor-pointer text-[22px] px-1 py-[2px]  mr-2 bg-[#22b3bf] text-white"
                      >
                        <MdSkipPrevious />
                      </div>
                    )}
                    {managerIndex && p > additionalPage * 5 ? (
                      <div
                        onClick={() => setAdditionalPage((pre) => pre + 1)}
                        className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                      >
                        <BiSkipNext />
                      </div>
                    ) : (
                      (additionalPage - 1) * (pageIndex - 5) < p &&
                      !isIndex && (
                        <p
                          onClick={() => {
                            if (p !== pageChoice) {
                              getNews(props.params.cate, p);
                              setPageChoice(p);
                            }
                          }}
                          className={`mx-1 px-[6px] hover:bg-[#d2d5d8] border border-[#2b2b2b]   ${
                            pageChoice === p ? "bg-[#d2d5d8]" : ""
                          } cursor-pointer`}
                        >
                          {p}
                        </p>
                      )
                    )}
                  </div>
                );
              }
            )}
        </div>
        {!loading ? (
          data.length > 0 ? (
            data.map((d) => (
              <Link
                key={d.id}
                href={`/[slug]`}
                as={`${props.params.cate
                  ?.replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}/${d.name
                  .replace(/\s+/g, "-")
                  .replace(/&/g, "-and-")}/${d.id}`}
                className="w-full flex flex-wrap min-[420px]:flex-nowrap mb-6"
              >
                <div className="min-w-[100%] h-[150px] min-[420px]:min-w-[250px] md:h-[140px] xl:min-w-[350px] xl:h-[210px] mr-3 md:mr-5">
                  <img
                    src={d.urlImage[0]?.image}
                    alt={d.urlImage[0]?.path}
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
                    {d.name}
                  </h3>
                  <p className="text-xs mt-1">
                    {moment(d.create_Date).format("DD/MM/YYYY HH:MM:SS")}
                  </p>
                  <div
                    className={`text-sm md:text-base  mt-2 overflow-hidden ${styles.description}`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                    dangerouslySetInnerHTML={{ __html: d.content }}
                  ></div>
                </div>
              </Link>
            ))
          ) : (
            <p>không có dữ liệu</p>
          )
        ) : (
          <p>Loading...</p>
        )}{" "}
      </div>
    </div>
  );
};

export default page;
