import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen}/>
        {/* Main Dashboard Content */}
        <div className="dashboard-body">
          <h2>Welcome to the Dashboard</h2>
        </div>
      </div>
    </div>
  );
}
