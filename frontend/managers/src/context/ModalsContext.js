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
    case "MAINTENANCE_DETAILS":
      return {
        ...state,
        maintenanceDetails: action.payload,
      };
    case "MAINTENANCE_IMAGES":
      return {
        ...state,
        maintenanceImages: action.payload,
      };
    case "FORWARD_MAINTENANCE":
      return {
        ...state,
        forwardMaintenance: action.payload,
      };
    case "INQUIRY_DETAILS":
      return {
        ...state,
        inquiryDetails: action.payload,
      };
    case "NEW_BILL":
      return {
        ...state,
        newBill: action.payload,
      };
    case "PAYMENT_RECORD":
      return {
        ...state,
        recordPayment: action.payload,
      };
    case "EDIT_BILL":
      return {
        ...state,
        editBill: action.payload,
      };
    case "NEW_EXPENSE":
      return {
        ...state,
        newExpense: action.payload,
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        editExpense: action.payload,
      };
    case "NEW_DOCUMENT":
      return {
        ...state,
        newDocument: action.payload,
      };
    case "EDIT_DOCUMENT":
      return {
        ...state,
        editDocument: action.payload,
      };
    case "CHANGE_EMAIL":
      return {
        ...state,
        changeEmail: action.payload,
      };
    case "CHANGE_PASSWORD":
      return {
        ...state,
        changePassword: action.payload,
      };
    case "CLOSE_ACCOUNT":
      return {
        ...state,
        closeAccount: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
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
    newTenant: false,
    editTenant: false,
    newSupplier: false,
    editSupplier: false,
    newReminder: false,
    editReminder: false,
    newAnnouncement: false,
    editAnnouncement: false,
    maintenanceDetails: false,
    maintenanceImages: false,
    forwardMaintenance: false,
    inquiryDetails: false,
    newBill: false,
    recordPayment: false,
    editBill: false,
    newExpense: false,
    editExpense: false,
    newDocument: false,
    editDocument: false,
    changeEmail: false,
    changePassword: false,
    closeAccount: false,
    loading: false,
    deleteConfirmation: false,
  });

  return (
    <ModalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalsContext.Provider>
  );
};
