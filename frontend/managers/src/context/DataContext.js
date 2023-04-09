import { createContext, useReducer } from "react";

export const DataContext = createContext();

function editItem(arr, updatedItem) {
  let index = arr.findIndex((item) => item._id === updatedItem._id);
  const editedArr = [...arr];
  editedArr[index] = updatedItem;
  return editedArr;
}
function deleteItem(arr, deletedItem) {
  return arr.filter((item) => item._id !== deletedItem._id);
}

export const dataReducer = (state, action) => {
  switch (action.type) {
    //* Tenants
    case "SET_TENANTS":
      return { ...state, tenants: action.payload };
    case "NEW_TENANT":
      return { ...state, tenants: [...state.tenants, action.payload] };
    case "EDIT_TENANT":
      return { ...state, tenants: editItem(state.tenants, action.payload) };
    case "DELETE_TENANT":
      return {
        ...state,
        tenants: deleteItem(state.tenants, action.payload),
      };

    //* Suppliers
    case "SET_SUPPLIERS":
      return { ...state, suppliers: action.payload };
    case "NEW_SUPPLIER":
      return { ...state, suppliers: [...state.suppliers, action.payload] };
    case "EDIT_SUPPLIER":
      return { ...state, suppliers: editItem(state.suppliers, action.payload) };
    case "DELETE_SUPPLIER":
      return {
        ...state,
        suppliers: deleteItem(state.suppliers, action.payload),
      };

    //* Reminders
    case "SET_REMINDERS":
      return { ...state, reminders: action.payload };
    case "NEW_REMINDER":
      return { ...state, reminders: [...state.reminders, action.payload] };
    case "EDIT_REMINDER":
      return { ...state, reminders: editItem(state.reminders, action.payload) };
    case "DELETE_REMINDER":
      return {
        ...state,
        reminders: deleteItem(state.reminders, action.payload),
      };

    //* Announcements
    case "SET_ANNOUNCEMENTS":
      return { ...state, announcements: action.payload };
    case "NEW_ANNOUNCEMENT":
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case "EDIT_ANNOUNCEMENT":
      return {
        ...state,
        announcements: editItem(state.announcements, action.payload),
      };
    case "DELETE_ANNOUNCEMENT":
      return {
        ...state,
        announcements: deleteItem(state.announcements, action.payload),
      };

    //* Maintenance
    case "SET_MAINTENANCE":
      return { ...state, maintenance: action.payload };
    case "MAINTENANCE_STATUS":
      return {
        ...state,
        maintenance: editItem(state.maintenance, action.payload),
      };

    //* Inquires
    case "SET_INQUIRES":
      return { ...state, inquires: action.payload };
    case "INQUIRY_RESPONSE":
      return {
        ...state,
        inquires: editItem(state.inquires, action.payload),
      };

    //* Billings
    case "SET_BILLINGS":
      return { ...state, billings: action.payload };
    case "NEW_BILLING":
      return {
        ...state,
        billings: [...state.billings, action.payload],
      };
    case "EDIT_BILLING":
      return {
        ...state,
        billings: editItem(state.billings, action.payload),
      };
    case "DELETE_BILLING":
      return {
        ...state,
        billings: deleteItem(state.billings, action.payload),
      };

    //* Reset All Data
    case "RESET_ALL":
      return {
        tenants: null,
        suppliers: null,
        reminders: null,
        announcements: null,
        maintenance: null,
        inquires: null,
      };

    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    tenants: null,
    suppliers: null,
    reminders: null,
    maintenance: null,
    inquires: null,
    billings: null,
  });

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
