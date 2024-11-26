import { useContext } from "react";
import { GameContext } from "../context/ContextExport";
import { useNavigate } from "react-router-dom";
import arenaImage from "/images/arena.png";
import "./Locations.css";

const Locations = () => {
  const { setGameState } = useContext(GameContext)!;
  const navigate = useNavigate();

  const goToLocation = (location: string) => {
    setGameState((prevState) => ({
      ...prevState,
      location: location,
    }));
    if (location === "arena") {
      navigate("/bondforge/battle");
    } else if (location === "guildhall") {
      navigate("/bondforge/party-management");
    }
    // Add more logic for other locations if needed
  };

  return (
    <div className="locations-menu">
      <h1>Select Your Destination</h1>
      <div className="locations-grid">
        <div className="location-card" onClick={() => goToLocation("arena")}>
          <img src={arenaImage} alt="Arena" className="location-image" />
          <p className="location-text">Arena</p>
        </div>
        <div
          className="location-card"
          onClick={() => goToLocation("guildhall")}
        >
          <img
            src="/images/guildhall.png"
            alt="Guild Hall"
            className="location-image"
          />
          <p className="location-text">Guild Hall</p>
        </div>
        {/* Add more location cards as needed */}
      </div>
    </div>
  );
};

export default Locations;
