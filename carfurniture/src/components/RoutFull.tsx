"use client";
import http from "@/utils/http";
import React, { useEffect, useState } from "react";
import RoutListing from "./Items/RoutListing";

const RoutFull = () => {
  const [data, setData] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const resT = await http.get("CategoryType/GetAll");
        const res = await http.get(`Category/GetAll/${resT.data[1]?.name}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <RoutListing
      currentPath="Tin tức"
      category="news"
      title="Tin tức"
      defaultR="Đã xem"
      cate={data.map((r) => ({
        categoryId: r.categoryId,
        categoryName: r.categoryName,
      }))}
    />
  );
};

export default RoutFull;
