import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const [authStatus, setAuthStatus] = useState("loading");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("https://excel-analysis-platform-gou1.onrender.com/api/auth/profile", {
          method: "GET",
          credentials: "include", // ✅ send cookie
        });

        const data = await res.json();

        if (res.ok) {
          setUserRole(data.role);
          setAuthStatus("authorized");
        } else {
          setAuthStatus("unauth");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setAuthStatus("unauth");
      }
    }

    checkAuth();
  }, []);

  if (authStatus === "loading") return <div>Loading...</div>;

  if (authStatus === "unauth") return <Navigate to="/" replace />;

  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
