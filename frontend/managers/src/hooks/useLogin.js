import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useModalsContext } from "./useModalsContext";

export function useLogin() {
  const { dispatch } = useAuthContext();
  const { dispatch: modalsDispatch } = useModalsContext();

  const [error, setError] = useState(null);

  async function login(email, password) {
    modalsDispatch({ type: "LOADING", payload: true });
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/managers/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      modalsDispatch({ type: "LOADING", payload: false });
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("board", JSON.stringify(json));
      //update the AUTH Context
      dispatch({ type: "LOGIN", payload: json });
      modalsDispatch({ type: "LOADING", payload: false });
      // scroll to the top of the home page after successfully logging in
      window.scrollTo(0, 0);
    }
  }
  return { login, error };
}
