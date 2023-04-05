
import { useModalsContext } from "./useModalsContext";
import { useAuthContext } from "./useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useDataContext } from "../hooks/useDataContext";

export function useFetchData() {
  const { dispatch } = useDataContext();
  const { dispatch: showModal } = useModalsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  async function fetchData(suffix,type) {
    showModal({ type: "LOADING", payload: true });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/${suffix}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: type, payload: json });
      showModal({ type: "LOADING", payload: false });
    }
    if (!response.ok) {
      //if user logs in with illegal or incorrect token
      if (json.error === "Request is not authorized") {
        logout();
        showModal({ type: "LOADING", payload: false });
      }
    }
  }
  return { fetchData };
}
