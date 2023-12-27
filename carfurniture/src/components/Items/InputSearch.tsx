import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import styles from "./styleItems.module.scss";
const InputSearch: React.FC<{
  placeholder?: string;
  onChange: (e: any) => void;
  onClick?: () => void;
  loading?: boolean;
}> = ({ placeholder, onChange, onClick, loading }) => {
  return (
    <div className="flex relative w-fit">
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder ?? "Search"}
        className="outline-[#41af6b] mr-1 shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] p-1 pr-3 rounded-md"
      />
      <div className="text-[20px] flex items-center justify-center p-1 absolute right-1 top-[2px]">
        <CiSearch />
      </div>
      <div
        className={`text-[14px] shadow-[0_0_2px_#4a8cbf] border-[#4a8cbf] border-[1px] rounded-md cursor-pointer flex items-center justify-center p-1 absolute right-[-70px] top-[2px] `}
        onClick={onClick}
      >
        {loading ? (
          <div className={`${styles.loading} `}>
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          "Tìm kiếm"
        )}
      </div>
    </div>
  );
};

export default InputSearch;
