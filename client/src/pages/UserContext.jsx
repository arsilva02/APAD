import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize the user state from localStorage or set to null if not available
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Persist user data to localStorage whenever it changes
  const setUserAndPersist = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user"); // Clear localStorage if user is set to null
    }
  };

  useEffect(() => {
    // Update localStorage whenever user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist }}>
      {children}
    </UserContext.Provider>
  );
};
