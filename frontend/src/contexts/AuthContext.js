import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const value = { userInfo, setUserInfo };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
