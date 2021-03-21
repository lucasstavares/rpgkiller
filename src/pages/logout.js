import React from "react";
import { Redirect } from "react-router-dom";

export const logout = () => {
  sessionStorage.removeItem("token");
  return <Redirect to="/login" />;
};
