import React from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from "react-router-dom";
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
import Home from "./home/Home";
import Reviews from "./reviews/Reviews";
import ReviewDetail from "./reviews/ReviewDetail";
import MonthlyGames from "./top_games/components/MonthlyGames";
import TopGamesList from "./top_games/components/TopGamesList";
import { HelmetProvider } from "react-helmet-async";
import PartyManagement from "./bondforge/components/PartyManagement";
import CookiePolicy from "./policy/CookiePolicy";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              {/* <Route index element={<Bondforge />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/bondforge" element={<MainMenu />} />
              <Route path="/bondforge/locations" element={<Locations />} />
              <Route path="/bondforge/battle" element={<Battle />} />
              <Route
                path="/bondforge/party-management"
                element={<PartyManagement />}
              />
              <Route path="/bondforge/about" element={<About />} />
              <Route path="/bondforge/updates" element={<Updates />} />
              <Route path="/bondforge/guide" element={<Guide />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/reviews/:slug" element={<ReviewDetail />} />
              <Route path="/top-games" element={<TopGamesList />} />
              <Route
                path="/top-games/:year/:month"
                element={<MonthlyGames />}
              />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route
                path="/policy/PrivacyPolicy.html"
                element={<Navigate to="/policy/PrivacyPolicy.html" replace />}
              />
            </Route>
          </Routes>
        </Router>
      </GameProvider>
    </HelmetProvider>
  </React.StrictMode>
);
