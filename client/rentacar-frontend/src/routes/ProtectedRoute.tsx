import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default ProtectedRoute;
