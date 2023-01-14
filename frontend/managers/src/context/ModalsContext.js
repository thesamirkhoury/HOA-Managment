import React, { createContext, useReducer } from "react";

export const ModalsContext = createContext();

export function modalsReducer(state, action) {
  switch (action.type) {
    case "NEW_TENANT":
      return {
        ...state,
        newTenant: action.payload,
      };
    case "TENANT_DETAILS":
      return {
        ...state,
        tenantDetails: action.payload,
      };
    case "EDIT_TENANT":
      return {
        ...state,
        editTenant: action.payload,
      };
    default:
      return state;
  }
}

export const ModalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, {
    tenantDetails: false,
    newTenant: false,
    editTenant: false,
  });

  return (
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};
