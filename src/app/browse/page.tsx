"use client";

import Unauth from "@/components/unauth-page";
import { useSession } from "next-auth/react";

export default function Browse() {
    //the session hooks returns null if the user is not signed in. therefore, we return the unauth component.
  const { data: session } = useSession();
  console.log(session);
  if (!session) return <Unauth />;
  return <div>browse component </div>;
}
