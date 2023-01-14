import React, { useContext } from "react";
import { ModalsContext } from "../context/ModalsContext";

export function useModalsContext() {
  const context = useContext(ModalsContext);

  if (!context) {
    throw Error(
      "useModalContext must be used inside a useModalsContextProvider"
    );
  }

  return context;
}
