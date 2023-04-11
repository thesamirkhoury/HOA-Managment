import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  function logout() {
    //remove user form local storage
    localStorage.removeItem("tenant");
    //dispatch logout function
    dispatch({ type: "LOGOUT" });
  }
  return { logout };
}
