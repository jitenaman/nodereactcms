import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#333",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
          Dashboard
        </Link>
        <Link to="/create" style={{ marginRight: "10px", color: "#fff" }}>
          Create Post
        </Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          background: "red",
          border: "none",
          padding: "6px 12px",
          color: "white",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
