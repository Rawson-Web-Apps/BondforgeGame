import { Outlet, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="header-link">
          <h1>Bondforge Game</h1>
        </Link>
        {/* Add navigation links or other header content here */}
      </header>
      <main className="main-content">
        <Outlet />{" "}
        {/* This renders the child route components like MainMenu, Locations, etc. */}
      </main>
    </div>
  );
};

export default App;
