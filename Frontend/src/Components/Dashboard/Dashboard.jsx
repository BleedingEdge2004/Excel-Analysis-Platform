import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import img2 from "../../assets/img2.png";
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
        // handleLogout("expired"); // Remove or define handleLogout if needed
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
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        <div className="dashboard-body">
          <h2>Welcome to the Dashboar to <strong className="name"> {user.name}</strong> </h2>
         <div className="contents">
          <div className="container-dashboard">
            <h1 className="heading">Hello.{user.name}</h1>
             <p className="top">
              Welcome to your Excel Analytics Dashboard, where data meets clarity.
Upload your Excel files and turn rows and columns into meaningful visual insights.
Navigate your performance, trends, and summaries—all in one place.

</p>
            <img src={img3} alt="image" className="dash-img"/>
           <div className="dashboard-text">

           </div>
          </div>
          </div>

          <div className="file-upload">
            <div className="upload-container">
              <div className="upload-icon">
                <img src={img2} className="upload-img" alt="Upload Icon" />
                <p className="drag">Drag and Drop or Upload</p>
              </div>
            </div>
            < ExcelVisualizer
                selectedFile={selectedFile}/>
          </div>
<ToastContainer />
        </div>
      </div>
    </div>
  );
}
