import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, redirect to SignIn
  if (!token) return <Navigate to="/" replace />;

  // If role is specified (like "admin") but user doesn't match, redirect
  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children; // Allow access
}
