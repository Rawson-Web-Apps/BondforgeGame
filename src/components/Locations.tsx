import { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import arenaImage from "/public/arena.png";
import "./Locations.css";

const Locations = () => {
  const { setGameState } = useContext(GameContext)!;
  const navigate = useNavigate();

  const goToLocation = (location: string) => {
    setGameState((prevState) => ({
      ...prevState,
      location: location, // Update the player's current location
    }));
    if (location === "arena") {
      navigate("/battle"); // For example, navigate to battle when arena is chosen
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
        {/* Add more location cards as needed */}
      </div>
    </div>
  );
};

export default Locations;
