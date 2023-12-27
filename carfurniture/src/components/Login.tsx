"use client";
import { cookies } from "next/headers";
import http from "@/utils/http";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useCookies } from "next-client-cookies";
const Login: React.FC<{
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setSession }) => {
  const cookies = useCookies();
  const [changePass, setChangePass] = useState<string | null>(null);
  const [account, setAccount] = useState<{
    userName: string;
    password: string;
  }>({ userName: "", password: "" });
  const [err, setErr] = useState<boolean>(false);
  const [eye, setEye] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (account.userName && account.password) {
      setLoading(true);
      const res = await http.post<
        | {
            expiration: string;
            refreshToken: string;
            token: string;
          }
        | string
      >("/User/Login", {
        username: account.userName,
        password: account.password,
      });

      if (typeof res.data !== "string" && res.data?.token) {
        cookies.set("token", res.data.token, {
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        cookies.set("refreshToken", res.data.refreshToken, {
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        cookies.set("userName", account.userName, {
          path: "/",
          secure: false,
          sameSite: "strict",
        });
        window.location.reload();
        setSession(false);
      } else {
        setErr(true);
      }
      setLoading(false);
    } else {
      setErr(true);
    }
  };
  const [code, setCOde] = useState<string | null>(null);
  const [message, setMassage] = useState<string>("");
  const handleSendCode = async () => {
    if (changePass) {
      setLoading(true);
      if (code === null) {
        const res = await http.post("User/SendForgotPasswordEmail", {
          userName: changePass,
        });
        if (res.data?.message) {
          setCOde("");
        }
      } else {
        const res = await http.post("User/VerifyCodeResetPassword", {
          userName: changePass,
          code: code,
        });
        if (res.data?.message) {
          setMassage("Confirm successfully");
        } else {
          setMassage("confirm code invalid");
        }
      }

      setLoading(false);
    }
  };
  return (
    <div
      className="w-full h-full z-[999] flex items-center justify-center bg-[#212121d4] fixed top-0 left-0 "
      onClick={() => setSession(false)}
    >
      {changePass !== null ? (
        <div
          className="w-[400px] flex flex-wrap items-center bg-[#4184a5] justify-center px-7 py-5 rounded-[5px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-base w-full text-center font-bold text-white mb-3">
            Gửi mã đến
          </h3>
          <input
            type="text"
            placeholder="User name"
            required
            name="userName"
            onChange={(e) => setChangePass(e.target.value)}
            className="w-full px-3 py-2 rounded-[5px] mb-3 border-[2px] border-[#308db4]"
          />

          {code !== null && (
            <input
              type="text"
              placeholder="Code"
              required
              onChange={(e) => setCOde(e.target.value)}
              className="w-full px-3 py-2 rounded-[5px] mb-3 border-[2px] border-[#308db4]"
            />
          )}
          <p
            className="text-white mt-2 text-base cursor-pointer w-full"
            onClick={() => setChangePass(null)}
          >
            Đăng nhập
          </p>
          <p className="text-sm w-full text-center text-[#71fb71] m-1">
            {message}
          </p>
          <button
            className="px-5 py-1 rounded-[5px] bg-white"
            onClick={handleSendCode}
          >
            {loading
              ? code
                ? "Đang xác nhận code"
                : "Đang gửi..."
              : code
              ? "Xác nhận"
              : "Gửi"}
          </button>
        </div>
      ) : (
        <div
          className="w-[350px] flex flex-wrap items-center bg-[#4184a5] justify-center px-3 py-5 rounded-[5px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-base w-full text-center font-bold text-white mb-3">
            MazdaShop.vn
          </h3>
          {err && (
            <h3 className="text-base w-full text-center font-bold text-red-500 mb-3">
              Tài khoản hoặc password sai!
            </h3>
          )}
          <input
            type="text"
            placeholder="User name"
            required
            name="userName"
            onChange={(e) =>
              setAccount({ ...account, userName: e.target.value })
            }
            className="w-full px-3 py-2 rounded-[5px] mb-3 border-[2px] border-[#308db4]"
          />
          <div className="w-full mb-3 relative">
            <input
              type={eye ? "password" : "text"}
              placeholder="password"
              required
              onChange={(e) =>
                setAccount({ ...account, password: e.target.value })
              }
              name="password"
              className="w-full px-3 py-2 rounded-[5px]  border-[2px] border-[#308db4]"
            />
            <p
              className="text-white mt-2 text-base cursor-pointer"
              onClick={() => setChangePass("")}
            >
              Quên mật khẩu
            </p>
            {eye ? (
              <div
                className="absolute top-[13px] right-3"
                onClick={() => setEye(false)}
              >
                <IoEyeOffOutline />
              </div>
            ) : (
              <div
                className="absolute top-[13px] right-3"
                onClick={() => setEye(true)}
              >
                <MdOutlineRemoveRedEye />
              </div>
            )}
          </div>
          <button
            className="px-5 py-1 rounded-[5px] bg-white"
            onClick={handleLogin}
          >
            {loading ? "Đang đăng nhập" : "Đăng nhập"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
