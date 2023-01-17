import React, { createContext, useReducer } from "react";

export const ModalsContext = createContext();

export function modalsReducer(state, action) {
  switch (action.type) {
    case "OFFCANVAS":
      return {
        ...state,
        showOffcanvas: action.payload,
      };
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
    case "NEW_SUPPLIER":
      return {
        ...state,
        newSupplier: action.payload,
      };
    case "EDIT_SUPPLIER":
      return {
        ...state,
        editSupplier: action.payload,
      };
    case "NEW_REMINDER":
      return {
        ...state,
        newReminder: action.payload,
      };
    case "EDIT_REMINDER":
      return {
        ...state,
        editReminder: action.payload,
      };
    case "NEW_ANNOUNCEMENT":
      return {
        ...state,
        newAnnouncement: action.payload,
      };
    case "EDIT_ANNOUNCEMENT":
      return {
        ...state,
        editAnnouncement: action.payload,
      };
    case "INQUIRY_REPLY":
      return {
        ...state,
        inquiryReply: action.payload,
      };
    case "INQUIRY_VIEW":
      return {
        ...state,
        inquiryView: action.payload,
      };
    case "MAINTENANCE_MANAGEMENT":
      return {
        ...state,
        maintenanceManagement: action.payload,
      };
    case "DELETE_CONFIRMATION":
      return {
        ...state,
        deleteConfirmation: action.payload,
      };
    default:
      return state;
  }
}

export const ModalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalsReducer, {
    showOffcanvas: false,
    tenantDetails: false,
    newTenant: false,
    editTenant: false,
    newSupplier: false,
    editSupplier: false,
    newReminder: false,
    editReminder: false,
    newAnnouncement: false,
    editAnnouncement: false,
    inquiryReply: false,
    inquiryView: false,
    maintenanceManagement:false,
    deleteConfirmation: false,
  });

  return (
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};
