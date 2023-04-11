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

    //* Do No change
    case "NO_CHANGE":
      return state;

    //* Reset All Data
    case "RESET_ALL":
      return {};

    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    announcements: null,
    maintenance: null,
    inquires: null,
  });

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
