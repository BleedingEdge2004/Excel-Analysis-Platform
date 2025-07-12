import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect after showing toast
      setTimeout(() => {
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 2000); // Wait for toast to finish
    } else {
      // Show error toast
      toast.error(data.msg || "Login failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } catch (err) {
    console.error(err);
    // Show generic error toast
    toast.error("Something went wrong", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign In</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-button">Sign In</button>
          <p className="auth-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
