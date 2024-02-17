import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const authState = useSelector((store: any) => store.auth);
  if (!authState.role || authState.role === "USER") {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default AdminRoute;
