import { createContext, useReducer } from "react";

export const TenantsContext = createContext();

export const tenantsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TENANTS":
      return { tenants: action.payload };
    case "NEW_TENANT":
      return { tenants: [...state.tenants, action.payload] };
    case "EDIT_TENANT":
      const index = state.tenants.findIndex(
        (tenant) => tenant._id === action.payload._id
      );
      const newTenantsArr = [...state.tenants];
      newTenantsArr[index] = action.payload;
      return {
        tenants: newTenantsArr,
      };
    case "DELETE_TENANT":
      return {
        tenants: state.tenants.filter(
          (tenant) => tenant._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const TenantsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tenantsReducer, {
    tenants: null,
  });

  return (
    <TenantsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TenantsContext.Provider>
  );
};
