import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [status, setStatus] = useState(navigator.onLine);

  function handleNetworkChange() {
    setStatus(navigator.onLine);
  }

  useEffect(() => {
    // add event listeners for network change
    window.addEventListener("offline", handleNetworkChange);
    window.addEventListener("online", handleNetworkChange);

    // clear the event listeners
    return () => {
      window.removeEventListener("offline", handleNetworkChange);
      window.removeEventListener("online", handleNetworkChange);
    };
  }, []);

  return { status };
}
