import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <span className="navbar-brand">
          Store Rating System
        </span>

        <div className="ms-auto d-flex align-items-center">
          <span className="text-white me-3">
            {user?.name}
          </span>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;