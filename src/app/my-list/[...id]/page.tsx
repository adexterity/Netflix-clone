"use client";

import { GlobalContext } from "@/context";
import { getAllFavorites } from "@/utils";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import MediaItem from "@/components/media-item";
import CircleLoader from "@/components/circle-loader/CircleLoader";
import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";

export default function MyList() {
  const {
    favorites,
    setFavorites,
    setPageLoader,
    pageLoader,
    loggedInAccount,
  } = useContext(GlobalContext);

  const { data: session } = useSession();

  const [totalFav, setTotalFav] = useState(null);

  useEffect(() => {
    async function extractFavorites() {
      const data = await getAllFavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );
      console.log(data, "favorites: myList");

      if (data) {
        setFavorites(data.map((item) => ({ ...item, addedToFavorites: true })));
        setTotalFav(data.length);
        console.log(totalFav, "totalFav");

        setPageLoader(false);
      }
    }

    extractFavorites();
  }, [loggedInAccount, totalFav]);

  
  //if no authentication, return the unath page
  if (session === null) return <Unauth />;
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
          My List ({totalFav})
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {favorites && favorites.length
            ? favorites.map((favoriteItem) => (
                <MediaItem
                  key={favoriteItem._id}
                  media={favoriteItem}
                  listView={true}
                />
              ))
            : "No favorites added"}
        </div>
      </div>
    </motion.div>
  );
}
