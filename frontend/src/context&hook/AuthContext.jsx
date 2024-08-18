import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      const userID = response.data.userId;
      const userName = response.data.userName;
      const userEmail = response.data.email;
      const userRole = response.data.role;
      localStorage.setItem("token", token);
      setUser({ token, userID, userName, userEmail, userRole });
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
    navigate('/');
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
