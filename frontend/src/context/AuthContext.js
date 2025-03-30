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

  const logedUser = async (user) => {
    if (user) {
      Cookies.set('user', user, {expires: 30})
      setUser(user);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logedUser, }}>
      {children}
    </AuthContext.Provider>
  );
};
