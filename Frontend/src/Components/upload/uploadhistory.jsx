import React, { useEffect, useState } from "react";
import "./upload.css";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";

function History() {
  const [uploadHistory, setUploadHistory] = useState([]); // ✅ Added state

  const fetchUploadHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files/history", {
        credentials: "include",
      });

      const data = await res.json();
      setUploadHistory(data.uploads); // ✅ just the array
    } catch (err) {
      console.error("Failed to fetch upload history:", err);
    }
  };

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  return (
    <div className="upload-history">
        
      <Sidebar className="open" isOpen={false} />
      <div className="history-content">
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
  );
}

export default History;
