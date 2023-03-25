import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside a useAuthContextProvider");
  }

  return context;
}