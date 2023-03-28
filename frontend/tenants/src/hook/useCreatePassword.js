import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useModalsContext } from "./useModalsContext";

export function useCreatePassword() {
  const { dispatch } = useAuthContext();
  const { dispatch: modalsDispatch } = useModalsContext();

  const [error, setError] = useState(null);

  async function createPassword(token, password) {
    modalsDispatch({ type: "LOADING", payload: true });
    setError(null);

    const response = await fetch(
      `http://localhost:4000/api/tenants/password/${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      modalsDispatch({ type: "LOADING", payload: false });
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("tenant", JSON.stringify(json));
      //update the AUTH Context
      dispatch({ type: "LOGIN", payload: json });
      modalsDispatch({ type: "LOADING", payload: false });
    }
  }
  return { createPassword, error };
}
