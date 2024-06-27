"use client";

import { AiOutlineSearch } from "react-icons/ai";

export default function Search({
  pathName,        // The current path name from the router
  router,          // The Next.js router object for navigation
  searchQuery,     // The current search query input value
  setSearchQuery,  // Function to update the search query state
  setPageLoader,   // Function to set the page loader state
  setShowSearchBar // Function to toggle the visibility of the search bar
}) {
  // Function to handle the search logic when the Enter key is pressed.
  const handleSearch = (e) => {
    // Check if the pressed key is Enter and if the search query is not empty or just whitespace.
    if (e.key === "Enter" && searchQuery && searchQuery.trim() !== "") {
      setPageLoader(true); // Show the page loader.
      
      // If the current path includes '/search', replace the current route.
      if (pathName.includes("/search")) {
        router.replace(`/search/${searchQuery}`);
      } else {
        // Otherwise, push a new route to the router.
        router.push(`/search/${searchQuery}`);
      }
    }
  };

  return (
    <div className="hidden md:flex justify-center items-centert text-center">
      <div className="bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%, 100%, 0.85)] px-4 items-center text-center flex">
        <div className="order-2">
          {/* Input field for the search query */}
          <input
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state on input change
            placeholder="Search Movies, TV and Dramas" 
            className="bg-transparent tex-[14px] font-medium h-[34px] px-4 py-2 placeholder:text-[14px] font-md text-white outiline-none w-[210px]"
            onKeyUp={handleSearch}
          />
        </div>
        <button className="px-2 5">
          <AiOutlineSearch
            onClick={() => setShowSearchBar(false)} // Hide search bar on icon click
            className="hdden sm:inline sm:w-6 sm:h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
