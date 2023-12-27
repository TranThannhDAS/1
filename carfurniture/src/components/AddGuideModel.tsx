"use client";
import React, { useEffect, useRef } from "react";

import type ReactQuill from "react-quill";
const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;
import "react-quill/dist/quill.snow.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "../app/news/styleNews.module.scss";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";
import { SiShopee } from "react-icons/si";
import http from "@/utils/http";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
const AddGuideModel: React.FC<{
  title: string;
  onClick: () => void;
  cateId: number;
  cateName: string;
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
  fet(name: string): Promise<void>;
  setNewsUp: React.Dispatch<
    React.SetStateAction<
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
  >;
  setLogin: (value: React.SetStateAction<boolean>) => void;
}> = ({
  title,
  onClick,
  cateId,
  cateName,
  newsUp,
  fet,
  setNewsUp,
  setLogin,
}) => {
  const [value, setValue] = useState<string>(newsUp?.content ?? "");
  const [token, setToken] = useState<{
    accessToken: string;
    refreshToken: string;
  }>();
  const [pre, setPre] = useState<boolean>(false);
  const cookies = useCookies();
  const [product, setProduct] = useState<{
    Id?: number;
    Name: string;
    Content: string;
    categoryId: number;
    FormCollection: any;
  }>({
    Id: newsUp?.id,
    Name: newsUp?.name ?? "",
    Content: newsUp?.content ?? "",
    categoryId: cateId,
    FormCollection: null,
  });
  const [image, setImage] = useState<string>(newsUp?.urlImage[0].image ?? "");
  const checkRef = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const handleUploadFIle = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      checkRef.current = true;
      setImage(URL.createObjectURL(file));
      setProduct({ ...product, FormCollection: file });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken = cookies.get("token");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        const axio = httpToken(accessToken, refreshToken, cookies);
        const access = await new Promise((resolve, reject) => {
          resolve(cookies.get("token"));
        });
        setLoading(true);
        const formData = new FormData();
        product.Content = value;
        formData.append("categoryName", cateName);
        formData.append("Name", product.Name);
        formData.append("Content", product.Content);
        formData.append("categoryId", String(product.categoryId));
        if (newsUp) {
          // update
          formData.append("Id", String(newsUp.id));
          formData.append("FormCollection", product.FormCollection);
          if (newsUp.id !== null) {
            const res = await axio.put("Guide/Update", formData);
          }
        } else {
          if (cateName && cateId && product.Name && product.Content) {
            //add
            formData.append("FormCollection", product.FormCollection);
            formData.append("Name", product.Name);
            formData.append("Content", product.Content);
            if (product.FormCollection) {
              const res = await axio.post("Guide/Create", formData);
            }
          }
        }
        await fet(cateName);
        checkRef.current = false;
        setNewsUp(undefined);
        onClick();
        setLoading(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "sub",
    "super",
    "color",
    "background",
    "link",
    "image",
    "video",
    "align",
  ];

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
          {
            color: [],
          },
          { background: [] },
        ],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
      ],
      handlers: {
        // Add custom handlers if needed
      },
    },
    // Add more modules as needed
  };
  useEffect(() => {
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    if (!token || !refreshToken) {
      redirect("/");
    } else {
      setToken({ accessToken: token, refreshToken: refreshToken });
    }
  }, []);

  return (
    <>
      <div
        className="w-full h-full top-0 left-0 z-9 fixed bg-[#1f1f1fde] z-50"
        onClick={onClick}
      ></div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" h-full p-5 items-start overflow-auto z-50 w-[80%] flex justify-center flex-wrap  fixed top-1/2 right-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white"
      >
        <h3 className="w-full p-3 h-fit text-center relative bg-[#0f6ab8] rounded-[5px] text-white">
          Danh mục {title}
          <div
            className="absolute top-[9px] left-2 text-[30px] cursor-pointer  hover:text-[#ff4367]"
            onClick={onClick}
          >
            <IoCloseCircleOutline />
          </div>
        </h3>
        <div className="w-1/2 min-h-[85%]">
          {" "}
          <div className="w-full block h-fit my-3">
            <label
              className="text-base cursor-pointer   w-[127px] px-5 py-1 rounded-[5px] shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px]"
              htmlFor="productFile"
            >
              Tải ảnh lên
            </label>
            <input
              required={newsUp ? false : true}
              className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productFile"
              type="file"
              hidden
              name="file"
              onChange={(e) => handleUploadFIle(e)}
            />
            {image && (
              <div className="w-[200px] h-[200px] mt-[10px]">
                <img src={image} className="w-full h-full" />
              </div>
            )}
          </div>
          <div className="w-full my-2 flex items-center h-fit my-3">
            <input
              required
              className="outline-[#41af6b] w-[350px] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="productName"
              type="text"
              value={product?.Name ?? ""}
              onChange={(e) => setProduct({ ...product, Name: e.target.value })}
              placeholder="Tiêu đề"
            />
          </div>{" "}
        </div>
        <div className={`w-1/2 my-2 flex items-center  flex-wrap  h-fit my-3`}>
          <h3 className="text-base mr-3 w-full">Content:</h3>
          <QuillWrapper
            className="w-full"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>{" "}
        {/* <div

        ></div> */}
        <div className="flex justify-around items-center w-full h-fit my-3">
          <div
            className="text-sm bg-[#3390e1] text-white rounded-[5px] px-3 py-1  cursor-pointer"
            onClick={() => setPre(true)}
          >
            Preview
          </div>
          <button
            className="text-sm bg-[#3390e1] text-white rounded-[5px] px-3 py-1  cursor-pointer"
            type="submit"
          >
            Submit{loading ? " is in processing..." : ""}
          </button>
        </div>
      </form>
      {pre && (
        <div
          className="w-full h-full fixed top-0 left-0 bg-white z-[999] overflow-auto"
          onClick={() => setPre(false)}
        >
          <div className="w-full h-full m-auto flex justify-between mb-4 overflow-auto md:w-[80%] mt-5">
            <div className="w-full h-full">
              <div className="w-fill h-[260px] min-[600px]:w-[600px] min-[600px]:h-[300px]">
                <img src={image} className="w-full h-full" />
              </div>
              <div className="w-full h-full p-2">
                <h3 className="text-base md:text-[17px] font-bold">
                  {product.Name}
                </h3>
                <p className="text-sm ">date time</p>
                <div
                  className={`w-full text-sm md:text-base  mt-3  ${styles.dangerouslySet}`}
                  // style={{
                  //   display: "-webkit-box",
                  //   WebkitLineClamp: 3,
                  //   WebkitBoxOrient: "vertical",
                  // }}
                  dangerouslySetInnerHTML={{ __html: value }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddGuideModel;
