import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import App from "./App";
import MainMenu from "./components/MainMenu";
import Locations from "./components/Locations";
import Battle from "./components/Battle";
import About from "./components/About";
import Updates from "./components/Updates";
import Guide from "./components/Guide";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainMenu />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/guide" element={<Guide />} />
            {/* Add other routes here for locations, battle, etc. */}
          </Route>
        </Routes>
      </HashRouter>
    </GameProvider>
  </React.StrictMode>
);
