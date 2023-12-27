"use client";
import SlideCategory from "@/components/Slide/SlideCategory";
import React, { useEffect, useRef, useState } from "react";
import Routing from "@/components/Items/Routing";
import Listing from "@/components/Items/Listing";
import { IoIosAddCircle } from "react-icons/io";
import dynamic from "next/dynamic";
import PreviousAdmin from "@/components/PreviousAdmin";
import AddGuideModel from "@/components/AddGuideModel";
import InputSearch from "@/components/Items/InputSearch";
import FormAboutUs from "@/components/FormAboutUs";
import { redirect, usePathname } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { AxiosError, AxiosInstance } from "axios";
import { BiSkipNext } from "react-icons/bi";
import { MdSkipPrevious } from "react-icons/md";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import Software from "@/components/Software";
const GuideAdmin = dynamic(
  () => import("@/components/RenderingData/GuideAdmin")
);
const NewsAdmin = dynamic(() => import("@/components/RenderingData/NewsAdmin"));
const ProductAdmin = dynamic(
  () => import("@/components/RenderingData/ProductAdmin")
);
const AddNewsModel = dynamic(() => import("@/components/AddNewsModel"), {
  loading: () => <p className="text-red">Loading...</p>,
});
const AddProductModel = dynamic(() => import("@/components/AddProductModel"), {
  loading: () => <p className="text-red">Loading...</p>,
});

const page = () => {
  const cookies = useCookies();
  // your code
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [pageChoice, setPageChoice] = useState<number>(1);
  const [loadingType, setLoadingType] = useState<boolean>(false);
  const [loadingDirect, setLoadingDirect] = useState<boolean>(false);
  const [dataProducts, setDataProducts] = useState<
    {
      id: number;
      name: string;
      price: number;
      price_After: number;
      description: string;
      urlShoppe: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataNews, setDataNews] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  const [dataGuid, setDataGuid] = useState<
    {
      id: number;
      name: string;
      create_Date: string;
      content: string;
      urlImage: { image: string; path: string }[];
    }[]
  >([]);
  // update
  const [productUp, setProductUp] = useState<{
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
    urlImage: { image: string; path: string }[];
  }>();

  const [newsUp, setNewsUp] = useState<
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined
  >();
  const [guideUp, setGuideUp] = useState<
    | {
        id: number;
        name: string;
        create_Date: string;
        content: string;
        urlImage: { image: string; path: string }[];
      }
    | undefined
  >();
  const [dataCate, setDataCate] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  let product = dataCate[0]?.id;
  let news = dataCate[1]?.id;
  let guide = dataCate[2]?.id;
  const [dataList, setDataList] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  const router = useRouter();
  const tokeRef = useRef<string>("");
  const [add, setAdd] = useState<string>("");
  const [pre, setPre] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const [addCate, setAddCate] = useState<boolean>(false);
  const [aboutUs, setAboutUs] = useState<boolean>(false);
  const [sysTem, setSysTem] = useState<boolean>(false);
  const [categoryType, setCategory] = useState<number>(product ?? 0); // Directory
  const [cate, setCate] = useState<{
    categoryId: number;
    categoryName: string;
  }>({
    categoryId: 0,
    categoryName: "",
  });
  const pathname = usePathname();

  const [additionalPage, setAdditionalPage] = useState<number>(1);
  const [loading, setLoading] = useState("");
  const [routs, setRouts] = useState(["Quản trị"]);
  const [nameRout, setNameRout] = useState("");
  const [load, setLoad] = useState(false);
  const fet = async () => {
    setLoadingType(true);

    try {
      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const access = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });

        if (access) {
          const res = await axio.get<typeof dataCate>("CategoryType/GetAll");
          setCategory(res.data[0].id);
          setDataCate(res.data);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
    setLoadingType(false);
  };

  const fetS = async () => {
    setDataList([]);
    const accessToken = cookies.get("token");
    const refreshToken = cookies.get("refreshToken");
    if (accessToken && refreshToken) {
      try {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const access = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });
        if (access) {
          const which = dataCate.filter((c) => c.id === categoryType)[0]?.name;
          const resCate = await axio.get<
            { categoryName: string; categoryId: number }[]
          >(`Category/GetAll/${which}`);
          setNameRout(resCate.data[0]?.categoryName ?? "");
          setCate({
            categoryId: resCate.data[0]?.categoryId,
            categoryName: resCate.data[0]?.categoryName ?? "",
          });
          setDataList(resCate.data);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
          setLogin(true);
        }
      }
    }
  };

  useEffect(() => {
    const accessToken = cookies.get("token");
    const refreshToken = cookies.get("refreshToken");
    if (!accessToken || !refreshToken) {
      redirect("/");
    } else {
      tokeRef.current = accessToken;
      fet();
    }
  }, []);

  useEffect(() => {
    if (dataCate.length) {
      fetS();
    }
  }, [dataCate, categoryType]);
  async function fetCateName(name: string, index = 1, search?: string) {
    const accessToken = cookies.get("token");
    const refreshToken = cookies.get("refreshToken");
    try {
      if (accessToken && refreshToken) {
        setLoadingSearch(true);
        setLoadingDirect(true);
        const axio = httpToken(accessToken, refreshToken, cookies);
        const acc = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });

        if (acc) {
          if (categoryType === product) {
            const accs = cookies.get("token");
            if (accs) {
              const res = await axio.post("Product/GetPaginationProduct", {
                pageIndex: index,
                pageSize: 4,
                search_CategoryName: name,
                search_Name: search,
              });
              setPageIndex(res.data.totalPageIndex);
              setDataProducts(res.data.data);
            }
          } else {
            setDataProducts([]);
          }
          if (categoryType === news) {
            const accsb = cookies.get("token");
            if (accsb) {
              const res = await axio.post("Blog/GetPaginationProduct", {
                pageIndex: index,
                pageSize: 6,
                search_Name: search,
                search_CategoryName: name,
              });
              setPageIndex(res.data.totalPageIndex);
              setDataNews(res.data.data);
            }
          } else {
            setDataNews([]);
          }
          if (categoryType === guide) {
            const accsbc = cookies.get("token");
            if (accsbc) {
              const res = await axio.post("Guide/GetPaginationProduct", {
                pageIndex: index,
                pageSize: 6,
                search_Name: search,
                search_CategoryName: name,
              });
              setPageIndex(res.data.totalPageIndex);
              setDataGuid(res.data.data);
            }
          }
        }
      }
      setLoadingDirect(false);

      setLoadingSearch(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
  }
  useEffect(() => {
    fetCateName(nameRout, 1);
    if (routs.length >= 2) {
      routs[1] = nameRout;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      if (nameRout) setRouts((pre) => [...pre, nameRout]);
    }
  }, [nameRout]);

  const handleRount = (vl: string) => {
    // change rout
    setNameRout(vl);
    setAdditionalPage(1);

    setPageIndex(0);
    if (routs.length >= 2) {
      routs[1] = vl;
      setRouts(routs.filter((r, index) => index !== 2));
    } else {
      setRouts((pre) => [...pre, vl]);
    }
    fetCateName(vl, 1);
    setLoad(!load);
  };

  const chooseCate = (id: number) => {
    setCategory(id);
    setPageIndex(0);
    setAdditionalPage(1);
    setAddCate(false);
  };

  const [nameCate, setNameCate] = useState("");
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const handleAddCate = async () => {
    setLoadingAdd(true);
    const accessToken = cookies.get("token");
    const refreshToken = cookies.get("refreshToken");
    try {
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const acces = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });

        if (nameCate && acces) {
          const res = await axio.post<typeof dataCate>("Category/Create", {
            Name: nameCate,
            categoryTypeId: categoryType,
          });
          setAddCate(false);
          setNameCate("");
          if (res.data) fetS();
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
    setLoadingAdd(false);
  };
  const handleDeleteDirectory = async (id: number) => {
    try {
      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const access = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });

        if (access) {
          const res = await axio.delete(`Category/Delete/${id}`);
          if (res.data?.mess) {
            fetS();
          }
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    fetCateName(cate.categoryName, 1, search);
  };
  const handleUpdateDirectory = async (id: number, name: string) => {
    try {
      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const access = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });

        if (access) {
          const ts = cookies.get("token");
          if (ts) {
            const res = await axio.put(`Category/Update`, {
              Id: id,
              Name: name,
              CategoryTypeId: categoryType,
            });
            fetS();
            setDataList((pre) =>
              pre.map((r) => {
                if (r.categoryId === id) r.categoryName = name;
                return r;
              })
            );

            return true;
          }
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
    return false;
  };
  let managerIndex = false;
  let isIndex = false;
  let managerIndex2 = false;
  let isIndex2 = false;

  return (
    <div className="flex flex-wrap ">
      {login && (
        <div className="w-full h-full z-[999] flex items-center justify-center bg-[#212121d4] fixed top-0 left-0 ">
          <div
            className="w-[350px] flex flex-wrap items-center bg-[#4184a5] justify-center px-3 py-5 rounded-[5px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white">
              Session này đã hết hạn vui lòng ra ngoài đăng nhập lại
            </h3>
            <button
              className="text-white mt-2 text-base cursor-pointer w-full border-[2px]"
              onClick={() => {
                const accessToken = cookies.get("token");
                const refreshToken = cookies.get("refreshToken");
                if (accessToken && refreshToken) {
                  cookies.remove("token");
                  cookies.remove("refreshToken");
                  cookies.remove("userName");
                  router.push("/");
                }
              }}
            >
              Thoát khỏi session
            </button>
          </div>
        </div>
      )}
      <div className="w-full px-5 py-2">
        <SlideCategory
          loading={loadingType}
          data={dataCate}
          onClick={chooseCate}
          active={categoryType}
        />
      </div>
      <div className="w-full flex flex-wrap md:flex-nowrap">
        <div className=" px-5 w-full md:w-[400px]">
          <div className="w-full my-3 mb-4">
            <Routing routs={routs} pathname={pathname} />
          </div>
          <div className="w-full flex mb-15 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-[350px]  mb-5 md:border-r mr-2">
              <div className="w-full">
                <Listing
                  onClick={handleRount}
                  loading={loadingDirect}
                  data={dataList}
                  del={true}
                  handleUpdateDirectory={handleUpdateDirectory}
                  handleDeleteDirectory={handleDeleteDirectory}
                  menu={
                    dataCate.filter((d) => d.id === categoryType)[0]?.name ?? ""
                  }
                  choice={routs[1]}
                  Tag="div"
                  default={dataList[0]?.categoryName}
                />
              </div>
              <div
                className={`w-full flex items-center cursor-pointer ${
                  addCate ? "" : "hover:text-[#1f80d4]"
                }`}
                onClick={() => setAddCate(true)}
              >
                <div className="flex mr-3 text-[20px]">
                  <IoIosAddCircle />
                </div>
                {addCate ? (
                  <>
                    <input
                      required
                      type="text"
                      placeholder="Thêm danh mục"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleAddCate();
                      }}
                      onChange={(e) => setNameCate(e.target.value)}
                      className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
                    />
                    <button
                      onClick={handleAddCate}
                      className="hover:text-[#4a8cbf] p-[6px] hover:bg-[#e0f0fe] rounded-[6px] border-[1px] shadow-[0_0_2px_#4a8cbf text-sm shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf]"
                    >
                      {loadingAdd ? "Loading..." : "Thêm"}
                    </button>
                  </>
                ) : (
                  <p className="text-sm">Them danh muc</p>
                )}
              </div>
            </div>
            <h3 className="w-full md:hidden text-center border-b">
              {routs[1]}
            </h3>
          </div>
        </div>
        <div className="flex w-full md:w-[70%] flex-wrap justify-center border-l border-t border-b-slate-900 p-5 relative">
          {routs[1] && (
            <div
              className="absolute top-1 right-2 z-20 px-3 py-2 rounded-[5px] bg-[#1e7ccd] cursor-pointer text-white"
              onClick={() => {
                setAdd(routs[1]);
                setLoad(!load);
                setProductUp(undefined);
                setNewsUp(undefined);
                setGuideUp(undefined);
              }}
            >
              {categoryType === product && <p>Thêm sản phẩm</p>}
              {categoryType === news && <p>Thêm tin tức</p>}
              {categoryType === guide && <p>Thêm hướng dẫn</p>}
            </div>
          )}
          <div className="w-full mb-4">
            <InputSearch
              placeholder={routs[1]}
              onChange={handleSearch}
              onClick={handleClick}
              loading={loadingSearch}
            />
          </div>
          {categoryType === product ? (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
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
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
              {dataProducts.length > 0 ? (
                dataProducts.map((p) => (
                  <ProductAdmin
                    key={p.id}
                    p={p}
                    setLogin={setLogin}
                    cookies={cookies}
                    cate={cate}
                    setAdd={setAdd}
                    setLoading={setLoading}
                    setProductUp={setProductUp}
                    productUp={productUp}
                    fetCateName={fetCateName}
                    loading={loading}
                    nameRout={nameRout}
                    rout={routs[1]}
                  />
                ))
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
              <div className="w-full h-fit flex justify-center pb-1 border-t pt-2 mt-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
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
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
            </>
          ) : categoryType === news ? (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
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
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
              {dataNews.length > 0 ? (
                dataNews.map((bl) => (
                  <NewsAdmin
                    bl={bl}
                    setAdd={setAdd}
                    setLoading={setLoading}
                    setLogin={setLogin}
                    setNewsUp={setNewsUp}
                    cookies={cookies}
                    fetCateName={fetCateName}
                    loading={loading}
                    nameRout={nameRout}
                    newsUp={newsUp}
                    rout={routs[1]}
                    setPre={setPre}
                    key={bl.id}
                  />
                ))
              ) : (
                <p>Không có Blog nào</p>
              )}
              <div className="w-full pt-2 h-fit flex justify-center pb-1 border-t mt-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
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
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-fit flex justify-center pb-1 border-b mb-3">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
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
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
              {dataGuid.length > 0 ? (
                dataGuid.map((g) => (
                  <GuideAdmin
                    setAdd={setAdd}
                    setLoading={setLoading}
                    setLogin={setLogin}
                    setNewsUp={setNewsUp}
                    cookies={cookies}
                    fetCateName={fetCateName}
                    loading={loading}
                    nameRout={nameRout}
                    newsUp={newsUp}
                    rout={routs[1]}
                    key={g.id}
                    setGuideUp={setGuideUp}
                    g={g}
                  />
                ))
              ) : (
                <p>Không có guide nào</p>
              )}
              <div className="w-full  h-fit flex justify-center pb-1 border-t mt-3 pt-2">
                {pageIndex > 1 &&
                  Array.from(
                    { length: pageIndex },
                    (_, index) => index + 1
                  ).map((p) => {
                    if (p > additionalPage * 5 && !isIndex2) {
                      isIndex2 = true;
                      managerIndex2 = true;
                    } else {
                      managerIndex2 = false;
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
                        {managerIndex2 && p > additionalPage * 5 ? (
                          <div
                            onClick={() => setAdditionalPage((pre) => pre + 1)}
                            className="flex items-center text-[22px]  cursor-pointer  px-1 py-[2px]  ml-2 bg-[#22b3bf] text-white"
                          >
                            <BiSkipNext />
                          </div>
                        ) : (
                          (additionalPage - 1) * (pageIndex - 5) < p &&
                          !isIndex2 && (
                            <p
                              onClick={() => {
                                if (p !== pageChoice) {
                                  fetCateName(routs[1], p);
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
                  })}
              </div>
            </>
          )}
        </div>
      </div>
      {add ? (
        categoryType === product ? (
          <AddProductModel
            upCate={productUp}
            setUpCate={setProductUp}
            title={routs[1]}
            fet={fetCateName}
            setLogin={setLogin}
            onClick={() => {
              setAdd("");
            }}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        ) : categoryType === news ? (
          <AddNewsModel
            title={routs[1]}
            onClick={() => {
              setAdd("");
            }}
            newsUp={newsUp}
            setLogin={setLogin}
            setNewsUp={setNewsUp}
            fet={fetCateName}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        ) : (
          <AddGuideModel
            title={routs[1]}
            onClick={() => {
              setAdd("");
            }}
            newsUp={guideUp}
            setLogin={setLogin}
            setNewsUp={setGuideUp}
            fet={fetCateName}
            cateId={cate.categoryId}
            cateName={nameRout}
          />
        )
      ) : (
        <></>
      )}
      {aboutUs && (
        <FormAboutUs
          title="About us"
          onClick={() => setAboutUs(false)}
          setLogin={setLogin}
        />
      )}{" "}
      {sysTem && (
        <Software
          title="Phần mềm"
          onClick={() => setSysTem(false)}
          setLogin={setLogin}
        />
      )}
      <div
        className="w-fit fixed bg-[#0099e6] bottom-[88px] z-10 right-5 rounded-[5px] cursor-pointer font-medium px-3 py-1 text-white"
        onClick={() => setAboutUs(true)}
      >
        About us
      </div>{" "}
      <div
        className="w-fit fixed bg-[#0099e6] bottom-[133px] z-10 right-5 rounded-[5px] cursor-pointer font-medium px-3 py-1 text-white"
        onClick={() => setSysTem(true)}
      >
        Phần mềm
      </div>
      {(productUp || newsUp) && pre && (
        <PreviousAdmin setPre={setPre} product={productUp} news={newsUp} />
      )}
    </div>
  );
};

export default page;
