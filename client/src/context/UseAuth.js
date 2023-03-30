import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userAuth = createContext();

export const ProviderContext = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handlelogout = () => {
    setUser();
    localStorage.removeItem("useraccestoken");
    navigate("/login");
  };
  useEffect(() => {
    setUser(localStorage.getItem("useraccestoken"));
    // console.log(localStorage.getItem("useraccestoken"));
    // console.log(user);
  }, []);

  return (
    <userAuth.Provider value={{ user, setUser, handlelogout }}>
      {children}
    </userAuth.Provider>
  );
};

export const UserAuth = () => useContext(userAuth);
