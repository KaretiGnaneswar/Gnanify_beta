import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("auth_token") || null;
    } catch {
      return null;
    }
  });

  const isAuthed = !!token;

  useEffect(() => {
    const handler = () => {
      try {
        setToken(localStorage.getItem("auth_token"));
      } catch {
        setToken(null);
      }
    };

    window.addEventListener("storage", handler);
    window.addEventListener("auth:changed", handler);

    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("auth:changed", handler);
    };
  }, []);

  const login = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    window.dispatchEvent(new Event("auth:changed"));
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    window.dispatchEvent(new Event("auth:changed"));
  };

  return (
    <AuthContext.Provider value={{ token, isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
