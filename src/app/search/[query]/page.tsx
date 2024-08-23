"use client";

import Movies from "@/app/movies/page";
import CircleLoader from "@/components/circle-loader/CircleLoader";
import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { getTVorMovieSearchResult } from "@/utils";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import MediaItem from "@/components/media-item";
export default function Search() {
  // this state checks if the user is loggedin with pin
  const {
    loggedInAccount,
    setSearchResult,
    searchResult,
    setPageLoader,
    pageLoader,
  } = useContext(GlobalContext);
  const { data: session } = useSession();

  const params = useParams();
  useEffect(() => {
    async function getSearchResults() {
      const tvShows = await getTVorMovieSearchResult("tv", params.query);
      const movies = await getTVorMovieSearchResult("movie", params.query);
      console.log(tvShows, "tvshows");
      console.log(movies, "movies");

      setSearchResult([
        ...tvShows.results
          .filter(
            (item) =>
              item.backdropdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavourite: false,
          })),
        ...movies.results
          .filter(
            (item) =>
              item.backdropdrop_path !== null && item.poster_path !== null
          )
          .map((movieItem) => ({
            ...movieItem,
            type: "movie",
            addedToFavourite: false,
          })),
      ]);
    }

    getSearchResults();
  }, [loggedInAccount]);

  setPageLoader(false);
  console.log(session);
  if (!session) return <Unauth />;
  // if there is no logged in account, return the Account page
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl ">
          showing results for {decodeURI(params.query)}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResult && searchResult.length
            ? searchResult.map((searchItem) => (
                <MediaItem
                  key={searchItem.id}
                  media={searchItem}
                  searchView={true}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}
