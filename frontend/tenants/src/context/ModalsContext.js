import React, { createContext, useReducer } from "react";

export const ModalsContext = createContext();

export function modalsReducer(state, action) {
  switch (action.type) {
    case "OFFCANVAS":
      return {
        ...state,
        showOffcanvas: action.payload,
      };
    case "NEW_MAINTENANCE":
      return {
        ...state,
        newMaintenance: action.payload,
      };
    case "MAINTENANCE_IMAGES":
      return {
        ...state,
        maintenanceImages: action.payload,
      };
    case "NEW_INQUIRY":
      return {
        ...state,
        newInquiry: action.payload,
      };
    case "INQUIRY_DETAILS":
      return {
        ...state,
        inquiryDetails: action.payload,
      };
    case "CHANGE_EMAIL":
      return {
        ...state,
        changeEmail: action.payload,
      };
    case "BILLING_DETAILS":
      return {
        ...state,
        billingDetails: action.payload,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        changePassword: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export const ModalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, {
    showOffcanvas: false,
    newMaintenance: false,
    maintenanceImages: false,
    newInquiry: false,
    inquiryDetails: false,
    billingDetails: false,
    changeEmail: false,
    changePassword: false,
    loading: false,
  });

  return (
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};
