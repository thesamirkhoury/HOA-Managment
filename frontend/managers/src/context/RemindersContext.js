import { createContext, useReducer } from "react";

export const RemindersContext = createContext();

export const remindersReducer = (state, action) => {
  switch (action.type) {
    case "SET_REMINDERS":
      return { reminders: action.payload };
    case "NEW_REMINDER":
      return { reminders: [...state.reminders, action.payload] };
    case "EDIT_REMINDER":
      const index = state.reminders.findIndex(
        (reminder) => reminder._id === action.payload._id
      );
      const newRemindersArr = [...state.reminders];
      newRemindersArr[index] = action.payload;
      return {
        reminders: newRemindersArr,
      };
    case "DELETE_REMINDER":
      return {
        reminders: state.reminders.filter(
          (reminder) => reminder._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const RemindersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(remindersReducer, {
    reminders: null,
  });

  return (
    <RemindersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RemindersContext.Provider>
  );
};
