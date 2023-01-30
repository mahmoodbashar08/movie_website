import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/UseAuth";

const ProtectRouter = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  console.log(user);
  return user ? <Outlet /> : navigate("/login");
};

export default ProtectRouter;
