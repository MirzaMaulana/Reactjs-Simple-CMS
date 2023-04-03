import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  let isAuth = localStorage.getItem("token");
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
