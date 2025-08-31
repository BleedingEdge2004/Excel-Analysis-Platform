import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import Homepage from "./Components/Homepage/Homepage";
import HistoryPage from "./Components/upload/uploadhistory";
// import 
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          /* trunk-ignore(git-diff-check/error) */
          <Route path="/history" element={<HistoryPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
