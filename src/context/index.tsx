"use client";
import CircleLoader from "@/components/circle-loader/CircleLoader";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }: any) {
  const [loggedInAccount, setLoggedInAccount] = useState(null); //when the user is successfully logged-in, we set the user information into this state variable

  const [accounts, setAccounts] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [mediaData, setMediaData] = useState([]);
  const [searchResult, setsearchResult] = useState([]);
  const [mediaDetails, setMediaDetails] = useState(null)
  const [similarMedias, setSimilarMedias] = useState([])

  const [currentMediaInfoIdAndType, setcurrentMediaInfoIdandType] =
    useState(null); //this state changes when the down icon on the menuItem card is clicked.
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)

  const { data: session } = useSession();

  useEffect(() => {
    setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
  }, []);

  if (session === undefined) return <CircleLoader />;

  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        pageLoader,
        setPageLoader,
        mediaData,
        setMediaData,
        setsearchResult,
        searchResult,
        currentMediaInfoIdAndType,
        setcurrentMediaInfoIdandType,
        showDetailsPopup, setShowDetailsPopup,
        mediaDetails, setMediaDetails,
        similarMedias, setSimilarMedias

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
