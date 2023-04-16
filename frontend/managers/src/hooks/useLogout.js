import { useAuthContext } from "./useAuthContext";
import { useDataContext } from "./useDataContext";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: dataDispatch } = useDataContext();

  function logout() {
    //remove user form local storage
    localStorage.removeItem("board");
    //dispatch logout function and delete stored data
    dispatch({ type: "LOGOUT" });
    dataDispatch({type:"RESET_ALL"})
  }
  return { logout };
}
