import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authState = useSelector((store: any) => store.auth);
  if (authState.id === 0) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default ProtectedRoute;
