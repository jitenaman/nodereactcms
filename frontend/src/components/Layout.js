import { Link, Outlet, useNavigate } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin CMS</h2>
        <nav>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/create">➕ Create Post</Link>
          <Link to="/manage">📝 Manage Posts</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
