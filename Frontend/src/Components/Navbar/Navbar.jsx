import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // 👈 to decode JWT
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [message, setMessage] = useState("");


  const handleLogout = (reason = "expired") => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    if (reason === "expired") {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
      });
    } else if (reason === "manual") {
      toast.success("You have been logged out successfully.", {
        position: "top-right",
        autoClose: 1000,
      });
    }

    // Redirect after showing the toast
    setTimeout(() => {
      window.location.href = "/";
    }, 1000); // Wait for toast to finish
  };


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      handleLogout(); // no token, force logout
      return;
    }

    try {
      // Decode token to get expiry time
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds

      if (decoded.exp < currentTime) {
        // Token already expired
        handleLogout();
        return;
      }

      // Auto logout when token expires
      const timeUntilExpiry = (decoded.exp - currentTime) * 1000; // ms
      const logoutTimer = setTimeout(() => {
        handleLogout();
      }, timeUntilExpiry);

      // Fetch user details
      const fetchUser = async () => {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user details");
          if (res.status === 401 || res.status === 403) {
            handleLogout();
          }
        }
      };

      fetchUser();

      return () => clearTimeout(logoutTimer); // cleanup timer on unmount
    } catch (err) {
      console.error("Invalid token:", err);
      handleLogout();
    }
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
    <header className="navbar">
      {/* Sidebar Toggle */}
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        {isSidebarOpen ? "☰" : "✖"}
      </button>

      {/* Title */}
      <h1 className="navbar-title">📊 Excel Analytics</h1>

      {/* User Icon */}
      <div className="user-icon" onClick={toggleProfile}>
        👤
      </div>

      {/* User Profile Dropdown */}
      {showProfile && (
        <div className="user-profile">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={() => handleLogout("manual")}>Logout</button>
        </div>
      )}
    </header>
    <ToastContainer/>
    </>
  );
}
