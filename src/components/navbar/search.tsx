"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search({
  pathName,
  router,
  searchQuery,
  setSearchQuery,
  setPageLoader,
  setShowSearchBar,
}) {
  const handleSearch = (e) => {
      if (e.key === "Enter" && searchQuery && searchQuery.trim() !== "") {
      setPageLoader(true);
      if (pathName.includes("/search")) {
        router.replace(`/search/${searchQuery}`);
      } else {
        router.push(`/search/${searchQuery}`);
      }
    }
  };

  return (
    <div className="hidden md:flex justify-center items-centert text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%, 100%, 0.85)] px-4 items-center text-center flex">
        <div className="order-2">
          <input
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Movies, TV and Dramas"
            className="bg-transparent tex-[14px] font-medium h-[34px] px-4 py-2 placeholder:text-[14px] font-md text-white outiline-none w-[210px]"
            onKeyUp={handleSearch}
          />
        </div>
        <button className="px-2 5">
          <AiOutlineSearch
            onClick={() => setShowSearchBar(false)}
            className="hdden sm:inline sm:w-6 sm:h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
