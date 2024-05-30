"use client";
import CircleLoader from "@/components/circle-loader/CircleLoader";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);



export default function GlobalState({ children }: any) {

  //when the user is successfully logged-in, we set the user information into this state variable
  const [loggedInAccount, setLoggedInAccount] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [pageLoader, setPageLoader] = useState(true)

  const { data: session } = useSession();
  if (session === undefined) return <CircleLoader />;

  return <GlobalContext.Provider value={{loggedInAccount, setLoggedInAccount, accounts, setAccounts, pageLoader, setPageLoader}}>{children}</GlobalContext.Provider>;
}
