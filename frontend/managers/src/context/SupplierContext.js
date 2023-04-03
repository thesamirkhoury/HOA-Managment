import { createContext, useReducer } from "react";

export const SupplierContext = createContext();

export const suppliersReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUPPLIERS":
      return { suppliers: action.payload };
    case "NEW_SUPPLIER":
      return { suppliers: [...state.suppliers, action.payload] };
    case "EDIT_SUPPLIER":
      const index = state.suppliers.findIndex(
        (supplier) => supplier._id === action.payload._id
      );
      const newSupplierArr = [...state.suppliers];
      newSupplierArr[index] = action.payload;
      return {
        suppliers: newSupplierArr,
      };
    case "DELETE_SUPPLIER":
      return {
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const SupplierContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(suppliersReducer, {
    suppliers: null,
  });

  return (
    <SupplierContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SupplierContext.Provider>
  );
};
