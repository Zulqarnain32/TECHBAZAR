import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      axios.get("http://localhost:5000/login/success", { withCredentials: true })
        .then((res) => {
          if (res.data.message) {
            setUser(res.data.message);
            localStorage.setItem("user", JSON.stringify(res.data.message)); // Save user info
          }
        })
        .catch((err) => console.log("Google Auth Fetch Error:", err));
    }
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
