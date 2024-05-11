'use client'

import Unauth from "@/components/unauth-page";
import { useSession } from "next-auth/react";

export default function Browse(){
    const { data: session } = useSession();
  console.log(session);
  if (!session) return <Unauth />;
    return <div>browse component </div>
}