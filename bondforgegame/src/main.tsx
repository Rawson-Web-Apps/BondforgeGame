import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import App from "./App";
import MainMenu from "./components/MainMenu";
import Locations from "./components/Locations";
import Battle from "./components/Battle";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainMenu />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/battle" element={<Battle />} />
            {/* Add other routes here for locations, battle, etc. */}
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  </React.StrictMode>
);
