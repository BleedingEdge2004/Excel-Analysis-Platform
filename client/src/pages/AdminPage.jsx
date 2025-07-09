// client/src/pages/AdminPage.jsx
import React from "react";
// import axios from "axios";
import "../styles/AdminPage.css";

const AdminPage = () => {
    // const [activeTab, setActiveTab] = useState("profile");
    // const [admin, setAdmin] = useState({});
    // const [users, setUsers] = useState([]);
    // const [uploads, setUploads] = useState([]);

    // useEffect(() => {
    //     // Fetch admin profile
    //     axios.get("/api/admin/profile", { withCredentials: true })
    //         .then(res => setAdmin(res.data))
    //         .catch(err => console.error("Admin profile fetch error", err));

    //     // Fetch all users
    //     axios.get("/api/admin/users", { withCredentials: true })
    //         .then(res => setUsers(res.data))
    //         .catch(err => console.error("User fetch error", err));

    //     // Fetch uploads
    //     axios.get("/api/admin/uploads", { withCredentials: true })
    //         .then(res => setUploads(res.data))
    //         .catch(err => console.error("Upload fetch error", err));
    // }, []);

    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2 className="sidebar-title">Admin Panel</h2>
                <nav className="nav-links">
                    <button >👤 Profile</button>
                    <button >📁 Upload History</button>
                    <button >👥 Manage Users</button>
                </nav>
            </aside>

            <main className="content-area">

                <div className="card">
                    <h3>Admin Profile</h3>
                    <p><strong>Name:</strong> Admin Username</p>
                    <p><strong>Email:</strong> username@gmail.com</p>
                    <p><strong>Role:</strong> Admin</p>
                </div>



                <div className="card">
                    <h3>Uploads & Data Usage</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>File</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>



                <div className="card">
                    <h3>User Management</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr >
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
};

export default AdminPage;