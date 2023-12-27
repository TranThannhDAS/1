"use client";
import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import styles from "@/app/styleHomePage.module.scss";
import Link from "next/link";
import http from "@/utils/http";
import moment from "moment";
import { MdSkipPrevious } from "react-icons/md";
import { BiSkipNext } from "react-icons/bi";
import dynamic from "next/dynamic";
const News = dynamic(() => import("@/components/RenderingData/News"), {
  loading: () => <p className="text-red">Loading...</p>,
});

const page = (props: { params: { cate: string } }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
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

      const res = await http.post("Blog/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 6,
        search_CategoryName: cate,
        search_Name: name,
      });
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
      setLoadingSearch(false);
    } else {
      const res = await http.post("Blog/GetPaginationProduct", {
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
    getNews(decodeURIComponent(props.params.cate)?.replace(/-/g, " "));
  }, []);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    getNews(
      decodeURIComponent(props.params.cate)?.replace(/-/g, " "),
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
          placeholder={decodeURIComponent(props.params.cate)?.replace(
            /-/g,
            " "
          )}
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
            data.map((n) => <News key={n.id} n={n} cate={props.params.cate} />)
          ) : (
            <p>không có dữ liệu</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default page;
