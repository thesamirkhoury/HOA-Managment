import { useContext } from "react";
import { RemindersContext } from "../context/RemindersContext";

export function useRemindersContext() {
  const context = useContext(RemindersContext);
  if (!context) {
    throw Error(
      "useRemindersContext must be used inside a useAuthContextProvider"
    );
  }

  return context;
}
