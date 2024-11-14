import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);
  console.log(isInitialized, isAuthenticated);

  if (!isInitialized) return <h1>Loading..</h1>;

  if (!isAuthenticated) {
    navigate("/login");
  }

  return <>{children}</>;
}
