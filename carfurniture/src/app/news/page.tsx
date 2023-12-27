import InputSearch from "@/components/Items/InputSearch";
import Listing from "@/components/Items/Listing";
import Routing from "@/components/Items/Routing";
import Image from "next/image";
import styles from "./styleNews.module.scss";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function New() {
  return (
    <div className="w-full md:w-1/2 p-3 flex items-center justify-center">
      Vui lòng chọn danh mục bện cạnh
    </div>
  );
}
