"use client";
import InputSearch from "@/components/Items/InputSearch";
import React, { useEffect, useState } from "react";
import http from "@/utils/http";
import { BiSkipNext } from "react-icons/bi";
import { MdSkipPrevious } from "react-icons/md";
import dynamic from "next/dynamic";
const Product = dynamic(() => import("@/components/RenderingData/Product"), {
  loading: () => <p className="text-red">Loading...</p>,
});
const page = (props: { params: { cate: string } }) => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [additionalPage, setAdditionalPage] = useState<number>(1);

  const [data, setData] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >();

  const getProduct = async (cate: string, index = 1, name?: string) => {
    if (decodeURIComponent(cate)?.replace(/-/g, " ") === "Đã xem") {
      if (typeof localStorage !== "undefined") {
        const hasSeen: number[] =
          JSON.parse(localStorage.getItem("product") ?? JSON.stringify([])) ??
          [];
        if (hasSeen.length) {
          if (hasSeen.length === 1) {
            const res1 = await http.get<{
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
            }>(`Product/GetByID/${hasSeen[0]}`);
            setPageIndex(0);
            setData([{ ...res1.data.product, urlImage: res1.data.urlImage }]);
          } else if (hasSeen.length === 2) {
            const res1 = await http.get<{
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
            }>(`Product/GetByID/${hasSeen[0]}`);
            const res2 = await http.get(`Product/GetByID/${hasSeen[1]}`);

            setPageIndex(0);
            setData([
              { ...res1.data.product, urlImage: res1.data.urlImage },
              { ...res2.data.product, urlImage: res2.data.urlImage },
            ]);
          }
        }
      }
    }
    if (name) {
      setLoading(true);
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 4,
        search_Name: name,
        search_CategoryName: decodeURIComponent(cate),
      });
      setLoading(false);
      setPageIndex(res.data.totalPageIndex);
      setData(res.data.data);
    } else {
      setLoadingSearch(true);
      const res = await http.post("Product/GetPaginationProduct", {
        pageIndex: index,
        pageSize: 4,
        search_CategoryName: decodeURIComponent(cate),
      });
      setPageIndex(res.data.totalPageIndex);
      setLoadingSearch(false);
      setData(res.data.data);
    }
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleAdd = () => {
    getProduct(
      decodeURIComponent(props.params.cate)?.replace(/-/g, " "),
      1,
      search
    );
  };
  useEffect(() => {
    getProduct(decodeURIComponent(props.params.cate)?.replace(/-/g, " "));
  }, []);
  let managerIndex = false;
  let isIndex = false;
  return (
    <>
      <div className="w-full  min-[800px]:w-[49%] min-[1020px]:w-[60%] p-3">
        {decodeURIComponent(props.params.cate) !== "Đã xem" && (
          <div className="w-full mb-4">
            <InputSearch
              placeholder={decodeURIComponent(props.params.cate)?.replace(
                /-/g,
                " "
              )}
              onChange={handleSearch}
              onClick={handleAdd}
              loading={loading}
            />
          </div>
        )}
        <div className="w-full flex flex-wrap justify-center">
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
                                getProduct(props.params.cate, p);
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
          {!loadingSearch ? (
            data?.length ? (
              data?.map((p) => (
                <Product key={p.id} p={p} cate={props.params.cate} />
              ))
            ) : (
              <p>Không có sản phẩm nào</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
