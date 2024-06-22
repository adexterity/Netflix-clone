"use client";

import CircleLoader from "@/components/circle-loader/CircleLoader";
import { GlobalContext } from "@/context";
import { getTVorMovieDetailsByID } from "@/utils";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
export default function Watch() {
  const [mediaDetails, setMediaDetails] = useState(null);
  const [key, setKey] = useState(null);
  const params = useParams();

  const { pageLoader, setPageLoader } = useContext(GlobalContext);

  useEffect(() => {
    async function getMediaDetails() {
      const extractMediaDetails = await getTVorMovieDetailsByID(
        params.id[0],
        params.id[1]
      );

      console.log(params, "params");
      console.log(extractMediaDetails, "firstextracteddetails");

      if (extractMediaDetails) {
        const findIndexOfTrailer = extractMediaDetails.videos.results.findIndex(
          (item) => item.type === "Trailer"
        );

        const findIndexOfClip = extractMediaDetails.videos.results.findIndex(
          (item) => item.type === "Clip"
        );

        setMediaDetails(extractMediaDetails);
        setKey(
          findIndexOfTrailer !== -1
            ? extractMediaDetails.videos.results[findIndexOfTrailer]?.key
            : findIndexOfClip !== -1
            ? extractMediaDetails.videos.results[findIndexOfClip]?.key
            : "t7xHamn5inQ"
        );

        setPageLoader(false);
        console.log(findIndexOfClip);
        console.log(extractMediaDetails);
      }
    }

    getMediaDetails();
  }, [params]);

  if (pageLoader && mediaDetails === null) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${key}`}
        width={"100%"}
        height={"100%"}
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
        controls
      />
    </motion.div>
  );
}
