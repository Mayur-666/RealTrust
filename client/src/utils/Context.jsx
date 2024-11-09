import { createContext, useState } from "react";

export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [adminState, setAdminState] = useState({
    username: "",
    password: "",
    isAuth: false,
  });

  return (
    <MyContext.Provider value={{ adminState, setAdminState }}>
      {children}
    </MyContext.Provider>
  );
};
