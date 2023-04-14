import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw Error("useDataContext must be used inside a useDataContextProvider");
  }

  return context;
}
