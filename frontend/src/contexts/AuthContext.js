import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authData = {
  info: null,
  idToken: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "info":
      return { ...state, info: action.info };
    case "idToken":
      return { ...state, idToken: action.idToken };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, authData);
  const value = { user, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
