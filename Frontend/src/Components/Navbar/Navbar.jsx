import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ onToggleSidebar, isSidebarOpen }) {
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
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
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
}
