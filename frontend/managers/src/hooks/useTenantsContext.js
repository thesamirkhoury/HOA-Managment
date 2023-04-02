import { useContext } from "react";
import { TenantsContext } from "../context/TenantContext";

export function useTenantsContext() {
  const context = useContext(TenantsContext);
  if (!context) {
    throw Error(
      "useTenantsContext must be used inside a useAuthContextProvider"
    );
  }

  return context;
}
