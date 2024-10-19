import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

const Locations = () => {
  const { gameState, setGameState } = useContext(GameContext)!;
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
      <ul>
        <li onClick={() => goToLocation("arena")}>Arena</li>
        <li onClick={() => goToLocation("inn")}>Inn</li>
        {/* Add more locations like Items, Skills, etc. */}
      </ul>
    </div>
  );
};

export default Locations;
