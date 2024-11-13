import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="app"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header className="header">
        <Link to="/" className="header-link">
          <h1>Bondforge</h1>
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>
            Bondforge
          </Link>
          <Link to="/about" className="nav-link" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/updates" className="nav-link" onClick={toggleMenu}>
            Updates
          </Link>
          <Link to="/guide" className="nav-link" onClick={toggleMenu}>
            Game Guide
          </Link>
          {/* Add more links as needed */}
        </nav>
      </header>
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />{" "}
        {/* This renders the child route components like MainMenu, Locations, etc. */}
      </main>
      <footer className="footer">
        <p>
          Welcome to Bondforge, an exciting retro RPG where you embark on
          thrilling adventures, manage your party, and battle formidable foes.
          Explore diverse locations, hone your skills, and forge bonds with
          allies to become the ultimate hero.
        </p>
      </footer>
    </div>
  );
};

export default App;
