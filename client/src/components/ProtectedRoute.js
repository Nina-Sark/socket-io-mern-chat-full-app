import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);

  if (!auth) return <Navigate to="/" />;

  return children;
};
