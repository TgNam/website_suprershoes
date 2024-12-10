import React from "react";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {

  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);
  if (!isInitialized) return <h1>Loading..</h1>;

  if (!isAuthenticated) {
    window.location.href = "/login"
  }

  return <><h1>{children}</h1></>;
}
