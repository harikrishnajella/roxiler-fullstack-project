// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, }}>
      {children}
    </AuthContext.Provider>
  );
};