import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAuth() {
  const { user } = useContext(AuthContext);

  return user?.user ? <Outlet /> : <Navigate to="/" replace />;
}
