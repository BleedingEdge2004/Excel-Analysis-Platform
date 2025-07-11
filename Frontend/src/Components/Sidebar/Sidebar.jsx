import "./Sidebar.css";

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "closed" : "open"}`}>
      <nav className="sidebar-menu">
        <a href="#" className="sidebar-link active">🏠 Dashboard</a>
        <a href="#" className="sidebar-link">📜 My History</a>
        <a href="#" className="sidebar-link">⚙️ Settings</a>
      </nav>
    </div>
  );
}
