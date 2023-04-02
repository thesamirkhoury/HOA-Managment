import { createContext, useReducer } from "react";

export const TenantsContext = createContext();

export const tenantsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TENANTS":
      return { tenants: action.payload };
    case "NEW_TENANT":
      return { tenants: [action.payload, ...state.tenants] };
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
