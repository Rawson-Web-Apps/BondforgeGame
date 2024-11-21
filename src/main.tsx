import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import { GameProvider } from "./bondforge/context/GameContext";
import App from "./Tarawson";
import MainMenu from "./bondforge/components/MainMenu";
import Locations from "./bondforge/components/Locations";
import Battle from "./bondforge/components/Battle";
import About from "./bondforge/components/About";
import Updates from "./bondforge/components/Updates";
import Guide from "./bondforge/components/Guide";
import "./bondforge/Bondforge.css";
import "./Tarawson.css";
import Home from "./bondforge/components/Home";
import Reviews from "./reviews/Reviews";
import ReviewDetail from "./reviews/ReviewDetail";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<Bondforge />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/bondforge" element={<MainMenu />} />
            <Route path="/bondforge/locations" element={<Locations />} />
            <Route path="/bondforge/battle" element={<Battle />} />
            <Route path="/bondforge/about" element={<About />} />
            <Route path="/bondforge/updates" element={<Updates />} />
            <Route path="/bondforge/guide" element={<Guide />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:id" Component={ReviewDetail} />
            {/* Add other routes here for locations, battle, etc. */}
          </Route>
        </Routes>
      </HashRouter>
    </GameProvider>
  </React.StrictMode>
);
