import Link from "next/link";
import React from "react";

const Routing: React.FC<{
  routs: (string | undefined)[];
  pathname: string;
}> = ({ routs, pathname }) => {
  const d = pathname?.split("/");
  return (
    <div className="flex w-fit ">
      <a href="/" className="whitespace-nowrap">
        Trang chủ
      </a>
      {routs?.map((r, index, arr) => (
        <div key={r} className="w-fit flex  items-center justify-center">
          <p className="mx-5">/</p>
          {index < 2 ? (
            r && (
              <Link
                href={`/${
                  index === 0
                    ? pathname?.split("/")[1]
                    : pathname?.split("/")[1] + "/" + pathname?.split("/")[2]
                }`}
                className="whitespace-nowrap text-sm md:text-base cursor-pointer hover:text-[#42aaea]"
              >
                {r}
              </Link>
            )
          ) : (
            <p className="whitespace-nowrap text-sm md:text-base cursor-pointer">
              {r}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Routing;
