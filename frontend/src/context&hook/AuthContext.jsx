import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5119/api/Auth/login", {
        email,
        passwordHash: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser({ token });
      return response.data.message;
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await axios.post("http://localhost:5119/api/Auth/register", {
        email,
        passwordHash: password,
        username,
      });
      return response.data;
    } catch (err) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
