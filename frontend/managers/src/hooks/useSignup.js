import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useModalsContext } from "./useModalsContext";

export function useSignup() {
  const { dispatch } = useAuthContext();
  const { dispatch: modalsDispatch } = useModalsContext();

  const [error, setError] = useState(null);

  async function signup(
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    address,
    membersMonthlyFee,
    buildingCount,
    fileNumber
  ) {
    modalsDispatch({ type: "LOADING", payload: true });
    setError(null);
    if (password !== confirmPassword) {
      modalsDispatch({ type: "LOADING", payload: false });
      setError("הסיסמה והאימות אינם תואמים אחד את השני, נא לנסות שוב.");
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/managers/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            address,
            membersMonthlyFee,
            buildingCount,
            fileNumber,
          }),
        }
      );
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
        // scroll to the top of the home page after successfully signing up
        window.scrollTo(0, 0);
      }
    }
  }
  return { signup, error };
}
