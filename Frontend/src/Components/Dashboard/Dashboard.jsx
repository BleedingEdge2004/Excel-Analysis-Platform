import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
// import img2 from "../../assets/img2.png";
import img3 from "../../assets/dash.png";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExcelVisualizer from "../ExcelVisualizer/ExcelVisualizer";

export default function Dashboard() {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Auth failed:", err);
      }
    };
    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Uploaded: ${data.file}`);
        setSelectedFile(null);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload error occurred.");
    }
  };

  return (
    <div className="dash-wrapper">
      <Sidebar isOpen={sidebarOpen} />
      <div className="dash-main-content">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        <div className="dash-body">
          <h2 className="dash-welcome-title">
            Welcome to the Dashboard, <strong className="dash-username">{user.name}</strong>
          </h2>

          <div className="dash-info-card">
            <div className="dash-info-text">
              <h1 className="dash-greeting">Hello, {user.name}</h1>
              <p className="dash-intro">
                Welcome to your Excel Analytics Dashboard, where data meets clarity.
                Upload your Excel files and turn rows and columns into meaningful visual insights.
                Navigate your performance, trends, and summaries—all in one place.
              </p>
            </div>
            <img src={img3} alt="Dashboard Illustration" className="dash-image" />
          </div>

          <div className="upload-direction">
            <span className="arrow">⬇</span>
            <p className="arrow-text">Scroll down to upload your Excel file</p>
          </div>

          <div className="dash-upload-section">
            {/* <div className="dash-upload-box">
              <img src={img2} className="dash-upload-icon" alt="Upload Icon" />
              <p className="dash-upload-text">Drag and Drop or Upload</p>
            </div> */}
            <ExcelVisualizer selectedFile={selectedFile} />
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}