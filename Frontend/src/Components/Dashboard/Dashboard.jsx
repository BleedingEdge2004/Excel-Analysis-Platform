import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import img2 from "../../assets/img2.png";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
        fetchUploadHistory(); // Refresh history after successful upload
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload error occurred.");
    }
  };

  const fetchUploadHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files/history", {
        credentials: "include",
      });

      const data = await res.json();
      setUploadHistory(data.uploads); // ✅ just the array, no .map error
    } catch (err) {
      console.error("Failed to fetch upload history:", err);
    }
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        <div className="dashboard-body">
          <h2>Welcome to the Dashboard</h2>

          <div className="file-upload">
            <div className="upload-container">
              <div className="upload-icon">
                <img src={img2} className="upload-img" alt="Upload Icon" />
                <p className="drag">Drag and Drop or Upload</p>
              </div>
              <input
                type="file"
                className="file-input"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
              />
              <span className="upload-text">Upload Excel File</span>
              <button className="upload-button" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>

          {/* ✅ Upload History Section */}
          <div className="upload-history">
            <h3>Upload History</h3>
            {Array.isArray(uploadHistory) && uploadHistory.length > 0 ? (
              <ul className="history-list">
                {uploadHistory.map((file, index) => (
                  <li key={index} className="history-item">
                    <p><strong>File:</strong> {file.filename}</p>
                    <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                    <p><strong>Uploaded:</strong> {new Date(file.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No uploads yet.</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
