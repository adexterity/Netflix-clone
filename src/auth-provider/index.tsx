'use client'
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
