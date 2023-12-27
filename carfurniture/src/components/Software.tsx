"use client";
import http from "@/utils/http";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import httpToken from "@/utils/httpToken";
import { AxiosError } from "axios";
import { IoIosCloseCircle } from "react-icons/io";
const Software: React.FC<{
  title: string;
  onClick: () => void;
  setLogin: (value: React.SetStateAction<boolean>) => void;
}> = ({ title, onClick, setLogin }) => {
  const [data, setData] = useState<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >([]);
  const [dataSoft, setDataSoft] = useState<{
    name: string;
    link: string;
  }>({ name: "", link: "" });
  const dataF = useRef<typeof data>();
  const tokeRef = useRef<string>("");
  const cookies = useCookies();
  const [loading, setLoading] = useState<boolean>(false);
  const fet = async (token: string, refreshToken: string) => {
    const axio = httpToken(token, refreshToken, cookies);
    if (tokeRef.current) {
      const res = await axio.get("Button/GetAll");
      setData(res.data);
    }
  };

  useEffect(() => {
    const token = cookies.get("token") ?? "";
    const refreshToken = cookies.get("refreshToken") ?? "";
    if (!token || !refreshToken) {
      redirect("/");
    } else {
      tokeRef.current = token;
      fet(token, refreshToken);
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const tok = cookies.get("token");
      const tokR = cookies.get("refreshToken");

      setLoading(true);
      if (tok && tokR && dataSoft.name && dataSoft.link) {
        const axio = httpToken(tok, tokR, cookies);
        if (tokeRef.current) {
          const res = await axio.post<(typeof data)[]>("Button/Create", {
            Name: dataSoft?.name,
            Link: dataSoft?.link,
          });
          fet(tok, tokR);
          setDataSoft({ name: "", link: "" });
        }
      }
      setLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        setLogin(true);
      }
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center bg-[#1c1c1cc4] z-[999]"
      onClick={onClick}
    >
      <div
        className="w-full z-50 h-full p-5 sm:w-[640px] overflow-overlay  bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="w-full p-3 text-center relative">Software</h3>

        {data?.map((d) => (
          <div
            key={d.id}
            className="relative bg-[#c6c6c6] p-[9px] rounded-[5px] text-[#515456] mb-2"
          >
            <div
              className="absolute top-2 right-5 text-[30px] cursor-pointer z-10"
              onClick={async () => {
                // Button/Delete
                try {
                  const tok = cookies.get("token");
                  const tokR = cookies.get("refreshToken");

                  setLoading(true);
                  if (tok && tokR) {
                    const axio = httpToken(tok, tokR, cookies);
                    if (tokeRef.current) {
                      const res = await axio.delete(`Button/Delete/${d.id}`);
                      fet(tok, tokR);
                    }
                  }
                  setLoading(false);
                } catch (error) {
                  const err = error as AxiosError;
                  if (err.response?.status === 401) {
                    setLogin(true);
                  }
                }
              }}
            >
              <IoIosCloseCircle />
            </div>
            <p>
              <strong>Name: </strong>
              {d.name}
            </p>
            <p>
              <strong>Link: </strong>
              {d.link}
            </p>
          </div>
        ))}
        <div>
          <div className="w-full flex items-center h-fit my-3">
            <input
              required
              className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="address"
              type="text"
              value={dataSoft?.name}
              placeholder="Tên phần mềm"
              onChange={(e) =>
                setDataSoft({ ...dataSoft, name: e.target.value })
              }
            />
          </div>{" "}
          <div className="w-full flex items-center h-fit my-3">
            <input
              required
              className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
              id="sdt"
              value={dataSoft?.link}
              type="text"
              onChange={(e) =>
                setDataSoft({ ...dataSoft, link: e.target.value })
              }
              placeholder="Link"
            />
          </div>{" "}
        </div>
        <button
          className="text-sm bg-[#3390e1] text-white rounded-[5px] px-3 py-1  cursor-pointer"
          type="submit"
          onClick={handleUpdate}
        >
          Submit{loading ? " is in processing..." : ""}
        </button>
      </div>
    </div>
  );
};

export default Software;
