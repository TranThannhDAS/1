import React from "react";
import Map from "./Map";
import { CookiesProvider } from "next-client-cookies/server";

const Footer = () => {
  return (
    <CookiesProvider>
      {" "}
      <div className="w-full h-[400px] bg-[#212322] pt-[25px] sm:pt-0 sm:flex items-center justify-center">
        <Map />
      </div>
    </CookiesProvider>
  );
};

export default Footer;
