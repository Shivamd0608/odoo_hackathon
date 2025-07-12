// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    if (username === "admin" && password === "admin123") {
      const userData = { username };
      setUser(userData);
      return { success: true, message: "Login successful" };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ EXPORT THE HOOK
export const useAuth = () => useContext(AuthContext);
