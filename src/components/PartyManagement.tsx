import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { Character } from "../models/Character";
import {
  Warrior,
  Mage,
  Knight,
  Sorcerer,
  Paladin,
  Archmage,
  Champion,
  GrandSorcerer,
  CharacterClass,
} from "../models/class/CharacterClass";

const PartyManagement = () => {
  const { gameState, setGameState } = useContext(GameContext)!;

  const changeClass = (index: number, newClass: typeof Warrior) => {
    const updatedParty = [...gameState.party];
    updatedParty[index].classType = new newClass();

    setGameState((prevState) => ({
      ...prevState,
      party: updatedParty,
    }));
  };

  const getAvailableClasses = (level: number): (typeof CharacterClass)[] => {
    let classes = [Warrior, Mage];
    if (level >= 20) {
      classes.push(Knight, Sorcerer);
    }
    if (level >= 40) {
      classes.push(Paladin, Archmage);
    }
    if (level >= 60) {
      classes.push(Champion, GrandSorcerer);
    }
    return classes;
  };

  return (
    <div className="party-management">
      <h1>Manage Your Party</h1>
      {gameState.party.map((member, index) => (
        <div key={index}>
          <h2>
            {member.name} - Level: {member.level} - Class:{" "}
            {member.classType.constructor.name}
          </h2>
          <label>Change Class:</label>
          <select
            value={member.classType.constructor.name}
            onChange={(e) => changeClass(index, Warrior)} // Update this to handle multiple classes
          >
            {getAvailableClasses(member.level).map((ClassType) => (
              <option key={ClassType.name} value={ClassType.name}>
                {ClassType.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default PartyManagement;
