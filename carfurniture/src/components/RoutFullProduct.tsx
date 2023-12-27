"use client";
import http from "@/utils/http";
import React, { useEffect, useState } from "react";
import RoutListing from "./Items/RoutListing";

const RoutFullProduct = () => {
  const [data, setData] = useState<
    { categoryName: string; categoryId: number }[]
  >([]);
  useEffect(() => {
    const getData = async () => {
      const resT = await http.get("CategoryType/GetAll");
      const res = await http.get<
        { categoryName: string; categoryId: number }[]
      >(`Category/GetAll/${resT.data[0].name}`);
      const newData = res.data.map((r) => ({
        categoryId: r.categoryId,
        categoryName: r.categoryName,
      }));
      newData.push({
        categoryId: 9999,
        categoryName: "Đã xem",
      });
      setData(newData);
    };
    getData();
  }, []);
  return (
    <RoutListing
      currentPath="Sản phẩm"
      title="Sản phẩm"
      category="product"
      defaultR={data[0]?.categoryName}
      cate={data}
    />
  );
};

export default RoutFullProduct;
