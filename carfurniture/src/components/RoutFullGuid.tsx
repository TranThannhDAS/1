"use client";
import http from "@/utils/http";
import React, { useEffect, useState } from "react";
import RoutListing from "./Items/RoutListing";

const RoutFullGuid = () => {
  const [data, setData] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  useEffect(() => {
    const getData = async () => {
      const resT = await http.get("CategoryType/GetAll");
      const res = await http.get(`Category/GetAll/${resT.data[2].name}`);
      setData(res.data);
    };
    getData();
  }, []);
  return (
    <RoutListing
      currentPath="Hướng dẫn"
      category="guide"
      title="Hướng dẫn"
      defaultR=""
      cate={data.map((r) => ({
        categoryId: r.categoryId,
        categoryName: r.categoryName,
      }))}
    />
  );
};

export default RoutFullGuid;
