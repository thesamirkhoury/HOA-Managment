import React, { createContext, useReducer, useEffect } from "react";

export const RedirectContext = createContext();

export const redirectReducer = (state, action) => {
  switch (action.type) {
    case "SET_PATH":
      return { path: action.payload };
    default:
      return state;
  }
};

export const RedirectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(redirectReducer, {
    path: "/",
  });

  useEffect(() => {
    const path = sessionStorage.getItem("path");
    if (path) {
      dispatch({ type: "SET_PATH", payload: path });
    }
  }, []);

  return (
    <RedirectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RedirectContext.Provider>
  );
};
