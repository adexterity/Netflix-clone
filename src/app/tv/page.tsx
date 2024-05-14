'use client'

import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function Tv(){
    // this state checks if the user is loggedin with pin
    const {loggedInAccount} = useContext(GlobalContext)
    const { data: session } = useSession();
  console.log(session);
  if (!session) return <Unauth />;
    // if there is no logged in account, return the Account page
    if(loggedInAccount === null) return <ManageAccounts />
    return <div>Tv page </div>
}