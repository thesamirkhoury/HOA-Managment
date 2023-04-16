import { useContext } from "react";
import { RedirectContext } from "../context/RedirectContext";

export function useRedirectContext() {
  const context = useContext(RedirectContext);

  if (!context) {
    throw Error(
      "useRedirectContext must be used inside a useRedirectContextProvider"
    );
  }

  return context;
}
