"use client";
import { createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({children}:any ) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}
