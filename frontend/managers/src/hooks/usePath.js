import { useRedirectContext } from "./useRedirectContext";

export function usePath() {
  const { dispatch, path } = useRedirectContext();
  function setPath(pathname) {
    if (pathname !== "/login") {
      //save the last used path i session storage
      sessionStorage.setItem("path", pathname);
      //update the global context
      dispatch({ type: "SET_PATH", payload: pathname });
    }
  }

  return { setPath, path };
}
