import react, { useState, useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useModalsContext } from "./useModalsContext";

export function useSignup() {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchLoading } = useModalsContext();

  const [error, setError] = useState(null);

  async function signup(
    firstName,
    lastName,
    email,
    password,
    address,
    membersMonthlyFee,
    buildingCount
  ) {
    dispatchLoading({ type: "LOADING", payload: true });
    setError(null);

    const response = await fetch("http://localhost:4000/api/managers/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        address,
        membersMonthlyFee,
        buildingCount,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      dispatchLoading({ type: "LOADING", payload: false });

      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("board", JSON.stringify(json));
      //update the AUTH Context
      dispatch({ type: "LOGIN", payload: json });
      dispatchLoading({ type: "LOADING", payload: false });
    }
  }
  return { signup, error };
}
