"use client";

import CircleLoader from "@/components/circle-loader/CircleLoader";
import CommonLayout from "@/components/common-layout";
import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import {
  getAllFavorites,
  getPopularMedias,
  getTopratedMedias,
  getTrendingMedias,
} from "@/utils";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { FaD } from "react-icons/fa6";

export default function Browse() {
  // this state checks if the user is loggedin with pin
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  //the session hooks returns null if the user is not signed in. therefore, we return the unauth component.
  const { data: session } = useSession();

  useEffect(() => {
    async function getAllMedias() {
      const trendingTvShows = await getTrendingMedias("tv");
      const popularTvShows = await getPopularMedias("tv");
      const topratedTvShows = await getTopratedMedias("tv");
      const allFavorites = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );

      const trendingMovieShows = await getTrendingMedias("movie");
      const popularMovieShows = await getPopularMedias("movie");
      const topratedMovieShows = await getTopratedMedias("movie");
      setMediaData([
        ...[
          {
            title: "trending tv shows",
            medias: trendingTvShows,
          },
          {
            title: "popular tv shows",
            medias: popularTvShows,
          },
          {
            title: "top rated tv shows",
            medias: topratedTvShows,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) > -1
                : false,
          })),
        })),
        ...[
          {
            title: "trending movies",
            medias: trendingMovieShows,
          },
          {
            title: "popular movies",
            medias: popularMovieShows,
          },
          {
            title: "top rated movies",
            medias: topratedMovieShows,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) > -1
                : false,

          })),
        })),
      ]);
    }

    setPageLoader(false);
    getAllMedias();
  }, []);

  if (session === null) return <Unauth />;

  // if there is no logged in account, return the Account page
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  console.log(mediaData, "mediaData: browse");

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
