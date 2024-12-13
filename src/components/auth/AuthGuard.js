import React from "react";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const { isInitialized, isAuthenticated } = useSelector((state) => state.auth);

  if (!isInitialized)
    return (
      <div className="spinner-wrapper">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!isAuthenticated) {
    window.location.href = "/login";
  }

  return <div>{children}</div>;
}
