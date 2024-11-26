import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Tarawson.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="app" style={{ display: "flex", flexDirection: "column" }}>
      <header className="header">
        <Link to="/" className="header-link">
          <img
            src="/images/TAR/logo/tt.png"
            alt="TARawson Logo"
            className="header-logo"
          />
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/bondforge" className="nav-link" onClick={toggleMenu}>
            Bondforge
          </Link>
          <Link to="/reviews" className="nav-link" onClick={toggleMenu}>
            Reviews
          </Link>
          <Link to="/top-games" className="nav-link" onClick={toggleMenu}>
            Top Games
          </Link>
          {/* Add more links as needed */}
        </nav>
      </header>
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer className="home-footer">
        <p>
          &copy; {new Date().getFullYear()} Rawson Web Apps LLC. All rights
          reserved.
        </p>
        <Link to="/cookie-policy" className="footer-link">
          Cookie Policy
        </Link>
        <a href="/policy/PrivacyPolicy.html" className="footer-link">
          Privacy Policy
        </a>
        <Link to="/terms-use" className="footer-link">
          Terms of Use
        </Link>
      </footer>
    </div>
  );
};

export default App;
