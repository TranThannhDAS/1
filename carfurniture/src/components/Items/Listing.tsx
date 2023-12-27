import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import { RxUpdate } from "react-icons/rx";
const Listing: React.FC<{
  data?: {
    categoryName: string;
    categoryId: number;
  }[];
  choice: string;
  onClick: (vl: string) => void;
  default?: string;
  Tag?: any;
  menu?: string;
  loading?: boolean;
  handleDeleteDirectory?: (id: number) => Promise<void>;
  handleUpdateDirectory?: (id: number, name: string) => Promise<boolean>;
  del?: boolean;
  category?: string;
}> = ({
  data,
  choice,
  onClick,
  default: defaultR,
  Tag = Link,
  menu,
  handleUpdateDirectory,
  handleDeleteDirectory,
  loading,
  del,
  category,
}) => {
  const [onTap, setOnTap] = useState<boolean>(false);
  const [update, setUpdate] = useState<number | null>(null);
  const [updateText, setUpdateText] = useState<string>("");
  return (
    <div className="w-full">
      <div className="w-full md:w-[80%] max-[768px]:flex ">
        <div className="w-full p-2 relative mb-10 font-medium rounded-[30px] whitespace-nowrap text-base border border-black text-center">
          Danh mục {menu}
          <div
            className="w-full h-full flex items-center justify-end absolute top-0 right-0 min-[768px]:hidden pr-3"
            onClick={() => setOnTap(!onTap)}
          >
            <PiDotsNineBold />
          </div>
          {onTap && (
            <div
              className="absolute w-full bg-[#363636] text-white top-[44px] left-0 rounded-[5px] px-1 py-5 shadow-[0_0_4px_#909090] z-20 "
              onClick={(e) => e.stopPropagation()}
            >
              {loading ? (
                <p>Loading...</p>
              ) : (
                data?.map((r) => (
                  <div key={r.categoryId} className="w-full relative mb-3">
                    {!(update === r.categoryId) ? (
                      <Tag
                        href={`/[slug]`}
                        as={`/${defaultR}/${r.categoryName
                          ?.replace(/\s+/g, "-")
                          .replace(/&/g, "-and-")}`}
                        className={`w-full  text-sm md:text-base cursor-pointer  ${
                          choice === r.categoryName ? "text-[#0087ff]" : ""
                        }`}
                        onClick={() => onClick(r.categoryName)}
                      >
                        {r.categoryName}
                      </Tag>
                    ) : (
                      <div className="flex w-[70%]">
                        <input
                          type="text"
                          placeholder="Nhập tên"
                          className="outline-none w-[70%]"
                          value={updateText}
                          onChange={(e) => setUpdateText(e.target.value)}
                        />
                        <div
                          className="text-xs px-2 py-1 border bg-[#1e7ccd] text-white cursor-pointer rounded-[5px]"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (handleUpdateDirectory) {
                              const ok = await handleUpdateDirectory(
                                r.categoryId,
                                updateText
                              );
                              if (ok) setUpdate(null);
                            }
                          }}
                        >
                          update
                        </div>
                      </div>
                    )}
                    {del && (
                      <>
                        <div
                          className="absolute top-1 right-8 cursor-pointer"
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (r.categoryId === update) {
                              setUpdate(null);
                            } else {
                              setUpdate(r.categoryId);
                            }
                          }}
                        >
                          <RxUpdate />
                        </div>
                        <div
                          className="absolute top-1 right-2 cursor-pointer"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const isOk = window.confirm(
                              "Are you sure you want to delete?"
                            );
                            if (isOk && handleDeleteDirectory)
                              await handleDeleteDirectory(r.categoryId);
                          }}
                        >
                          <IoClose />
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="hidden min-[768px]:block">
          {data?.map((r) => (
            <div
              key={r.categoryId}
              className="w-full border-b relative border-[#303131]  mb-3"
            >
              {!(update === r.categoryId) ? (
                <Tag
                  href={`/[slug]`}
                  as={`${r.categoryName
                    ?.replace(/\s+/g, "-")
                    .replace(/&/g, "-and-")}`}
                  className={`w-full  text-sm md:text-base cursor-pointer hover:text-[#0087ff] ${
                    choice === r.categoryName ? "text-[#0087ff]" : ""
                  }`}
                  onClick={() => onClick(r.categoryName)}
                >
                  {r.categoryName}
                </Tag>
              ) : (
                <div className="flex w-[70%]">
                  <input
                    type="text"
                    placeholder="Nhập tên"
                    className="outline-none w-[70%]"
                    value={updateText}
                    onChange={(e) => setUpdateText(e.target.value)}
                  />
                  <div
                    className="text-xs px-2 py-1 border bg-[#1e7ccd] text-white cursor-pointer rounded-[5px]"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (handleUpdateDirectory) {
                        const ok = await handleUpdateDirectory(
                          r.categoryId,
                          updateText
                        );
                        if (ok) setUpdate(null);
                      }
                    }}
                  >
                    update
                  </div>
                </div>
              )}
              {del && (
                <>
                  <div
                    className="absolute top-1 right-8 cursor-pointer"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (r.categoryId === update) {
                        setUpdate(null);
                      } else {
                        setUpdate(r.categoryId);
                      }
                    }}
                  >
                    <RxUpdate />
                  </div>
                  <div
                    className="absolute top-1 right-2 cursor-pointer"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const isOk = window.confirm(
                        "Are you sure you want to delete?"
                      );
                      if (isOk && handleDeleteDirectory)
                        await handleDeleteDirectory(r.categoryId);
                    }}
                  >
                    <IoClose />
                  </div>
                </>
              )}
            </div>
          ))}
          {/* {category === "product" && (
            <div
              className={`w-full  text-sm md:text-base cursor-pointer  ${
                choice === "hasSeen" ? "text-[#0087ff]" : ""
              }`}
              onClick={() => onClick("hasSeen")}
            >
              Đã xem
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Listing;
