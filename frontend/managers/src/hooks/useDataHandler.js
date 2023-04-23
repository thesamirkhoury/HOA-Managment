import { useModalsContext } from "./useModalsContext";
import { useAuthContext } from "./useAuthContext";
import { useLogout } from "./useLogout";
import { useDataContext } from "./useDataContext";

export function useDataHandler() {
  const { dispatch } = useDataContext();
  const { dispatch: showModal } = useModalsContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  async function fetchData(suffix, type) {
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

  async function sendData(suffix, method, body, type) {
    if (!user) {
      // return error message
      return { error: "You must be logged in" };
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/${suffix}`,
      {
        method: method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      // return error message
      return json;
    }
    if (response.ok) {
      //add the data to the context
      dispatch({ type: type, payload: json });
      //if successful return no errors
      return null;
    }
  }

  async function sendFormData(suffix, method, formData, type) {
    if (!user) {
      // return error message
      return { error: "You must be logged in" };
    }
    showModal({ type: "LOADING", payload: true });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/${suffix}`,
      {
        method: method,
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      //hide loading modal
      showModal({ type: "LOADING", payload: false });
      // return error message
      return json;
    }
    if (response.ok) {
      //add the data to the context
      dispatch({ type: type, payload: json });
      //hide loading modal
      showModal({ type: "LOADING", payload: false });
      //if successful return no errors
      return null;
    }
  }

  async function fetchFile(suffix, fileName) {
    showModal({ type: "LOADING", payload: true });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/managers/${suffix}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.ok) {
      const blob = await response.blob();
      //download file
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      // hide loading modal
      showModal({ type: "LOADING", payload: false });
    }
    if (!response.ok) {
      const json = await response.json();

      //if user logs in with illegal or incorrect token
      if (json.error === "Request is not authorized") {
        logout();
        showModal({ type: "LOADING", payload: false });
      }
    }
  }
  return { fetchData, sendData, sendFormData, fetchFile };
}
