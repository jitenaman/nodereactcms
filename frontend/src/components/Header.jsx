import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Common navigation links
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">MyCMS</div>
        <nav>
          <ul className="flex space-x-6 items-center">
            {publicLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-gray-300">
                  {link.name}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                {authLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="hover:text-gray-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300 focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
