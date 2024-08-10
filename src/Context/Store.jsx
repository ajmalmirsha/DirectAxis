import { createContext, useState } from "react";

export const Context = createContext({
  userData: {
    username: "",
    email: "",
    fName: "",
    lName: "",
    age: null,
    address: "",
  },
});

export function ContextProvider({ children }) {
  const [userData, setUser] = useState({
    username: "",
    email: "",
    fName: "",
    lName: "",
    age: null,
    address: "",
  });

  function setUserData(key, value) {
    setUser((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  );
}
