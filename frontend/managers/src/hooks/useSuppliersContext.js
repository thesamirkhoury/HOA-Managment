import { useContext } from "react";
import { SupplierContext } from "../context/SupplierContext";

export function useSuppliersContext() {
  const context = useContext(SupplierContext);
  if (!context) {
    throw Error(
      "useSuppliersContext must be used inside a useAuthContextProvider"
    );
  }

  return context;
}
