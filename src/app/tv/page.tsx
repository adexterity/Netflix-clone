"use client";

import CircleLoader from "@/components/circle-loader/CircleLoader";
import CommonLayout from "@/components/common-layout";
import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { getTVorMoviesByGenre } from "@/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Tv() {
  // this state checks if the user is loggedin with pin
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);

  const { data: session } = useSession();
  console.log(session);


  useEffect(() => {
    async function getAllMedias() {
      const actionAdventure = await getTVorMoviesByGenre("tv", 10759);
      const crime = await getTVorMoviesByGenre("tv", 80);
      const comedy = await getTVorMoviesByGenre("tv", 35);
      const family = await getTVorMoviesByGenre("tv", 10751);
      const mystery = await getTVorMoviesByGenre("tv", 9648);
      const reality = await getTVorMoviesByGenre("tv", 10764);
      const scifiAndFantasy = await getTVorMoviesByGenre("tv", 10765);
      const war = await getTVorMoviesByGenre("tv", 10768);
      const western = await getTVorMoviesByGenre("tv", 37);
      const dramaMovies = await getTVorMoviesByGenre("tv", 18);

      setMediaData(
        [
          {
            title: "Action and adventure",
            medias: actionAdventure,
          },
          {
            title: "Crime",
            medias: crime,
          },
          {
            title: "Comedy",
            medias: comedy,
          },
          {
            title: "Family",
            medias: family,
          },
          {
            title: "Mystery",
            medias: mystery,
          },
          {
            title: "Reality",
            medias: reality,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiAndFantasy,
          },
          {
            title: "Western",
            medias: western,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Dramas",
            medias: dramaMovies,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites: false,
          })),
        }))
      );

      setPageLoader(false);
    }

    getAllMedias();
  }, [loggedInAccount]);

  if (!session) return <Unauth />;
  // if there is no logged in account, return the Account page
  if (loggedInAccount === null) return <ManageAccounts />;

  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
