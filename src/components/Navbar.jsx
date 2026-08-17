import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark" aria-hidden="true" />
          Loka Studio
        </Link>

        <nav className="navbar__links">
          <a href="/#layanan">Layanan</a>
          <a href="/#tentang">Tentang</a>
          <a href="/#kontak">Kontak</a>
        </nav>

        <div className="navbar__actions">
          {token ? (
            <>
              <Link to="/dashboard" className="btn btn--ghost">
                {user?.name ? `Halo, ${user.name.split(" ")[0]}` : "Dasbor"}
              </Link>
              <button className="btn btn--dark" onClick={handleLogout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">
                Masuk
              </Link>
              <Link to="/register" className="btn btn--dark">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
