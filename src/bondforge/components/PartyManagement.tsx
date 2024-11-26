import { useContext } from "react";
import { GameContext } from "../context/ContextExport";
import Character from "../models/Character";
import { useNavigate } from "react-router-dom";
import "./PartyManagement.css";

const PartyManagement = () => {
  const { gameState } = useContext(GameContext)!;

  const navigate = useNavigate();

  const handleBackToLocations = () => {
    navigate("/bondforge/locations");
  };

  return (
    <div className="party-management">
      <h1>Manage Your Party</h1>
      {gameState.party.map((member: Character, index: number) => (
        <div key={index} className="character-card">
          <h2>{member.name}</h2>
          <img
            src={`/images/${member.classType.constructor.name.toLowerCase()}.png`}
            alt={`${member.classType.constructor.name} Image`}
            className="class-image"
          />
          <p>
            HP: {member.currentHp} / {member.maxHp}
          </p>
          <div className="stat-bar">
            <div
              className="hp-bar"
              style={{ width: `${(member.currentHp / member.maxHp) * 100}%` }}
            ></div>
          </div>
          <p>
            MP: {member.currentMp} / {member.maxMp}
          </p>
          <div className="stat-bar">
            <div
              className="mp-bar"
              style={{ width: `${(member.currentMp / member.maxMp) * 100}%` }}
            ></div>
          </div>

          <p>Level: {member.level}</p>
          <p>Class: {member.classType.constructor.name}</p>
          <p>Experience: {member.experience}</p>
          <p>Attack: {member.calculateDamage()}</p>
          <p>Defense: {member.calculateDefense()}</p>
          <div className="equipment">
            <h3>Equipment</h3>
            <div className="equipment-layout">
              <div
                className={`equipment-slot ${
                  !member.equipment.head ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.head?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Head"
                />
              </div>
              <div
                className={`equipment-slot ${
                  !member.equipment.chest ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.chest?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Chest"
                />
              </div>
              <div
                className={`equipment-slot ${
                  !member.equipment.legs ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.legs?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Legs"
                />
              </div>
              <div
                className={`equipment-slot ${
                  !member.equipment.boots ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.boots?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Boots"
                />
              </div>
              <div
                className={`equipment-slot ${
                  !member.equipment.mainHand ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.mainHand?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Main Hand"
                />
              </div>
              <div
                className={`equipment-slot ${
                  !member.equipment.offHand ? "empty" : ""
                }`}
              >
                <img
                  src={`/images/equipment/${
                    member.equipment.offHand?.name
                      .toLowerCase()
                      .replace(/ /g, "_") || "transparent"
                  }.png`}
                  alt="Off Hand"
                />
              </div>
            </div>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <ul>
              {member.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <button className="back-button" onClick={handleBackToLocations}>
        Back to Locations
      </button>
    </div>
  );
};

export default PartyManagement;
