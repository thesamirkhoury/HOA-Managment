import { createContext, useReducer } from "react";

export const DataContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    //* Announcements
    case "SET_ANNOUNCEMENTS":
      return { ...state, announcements: action.payload };

    //* Maintenance
    case "SET_MAINTENANCE":
      return { ...state, maintenance: action.payload };
    case "NEW_MAINTENANCE":
      return {
        ...state,
        maintenance: [action.payload, ...state.maintenance],
      };

    //* Inquires
    case "SET_INQUIRES":
      return { ...state, inquires: action.payload };
    case "NEW_INQUIRY":
      return {
        ...state,
        inquires: [action.payload, ...state.inquires],
      };

    //* Billings
    case "SET_BILLINGS":
      return { ...state, billings: action.payload };

    //* Financial Dashboard
    case "SET_INCOME":
      return { ...state, income: action.payload };
    case "SET_SPENDING":
      return { ...state, spending: action.payload };

    //* Documents
    case "SET_DOCUMENTS":
      return { ...state, documents: action.payload };

    //* HOA Details
    case "SET_HOA":
      return { ...state, hoa: action.payload };

    //* Details
    case "SET_DETAILS":
      return { ...state, details: action.payload };

    //* Do No change
    case "NO_CHANGE":
      return state;

    //* Reset All Data
    case "RESET_ALL":
      return {
        announcements: null,
        maintenance: null,
        inquires: null,
        billings: null,
        income: null,
        spending: null,
        documents: null,
        hoa: null,
        details: null,
      };

    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    announcements: null,
    maintenance: null,
    inquires: null,
    billings: null,
    income: null,
    spending: null,
    documents: null,
    hoa: null,
    details: null,
  });

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
