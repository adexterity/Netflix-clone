"use client";

import ManageAccounts from "@/components/manage-accounts";
import Unauth from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function Browse() {
  // this state checks if the user is loggedin with pin
  const {loggedInAccount} = useContext(GlobalContext)
    //the session hooks returns null if the user is not signed in. therefore, we return the unauth component.
  const { data: session } = useSession();
  console.log(session, 'session');
  if (!session) return <Unauth />;

  // if there is no logged in account, return the Account page
  if(loggedInAccount === null) return <ManageAccounts />
  return <div>browse </div>;
}
