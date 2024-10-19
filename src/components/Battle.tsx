import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";

interface Enemy {
  name: string;
  health: number;
  attack: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

const Battle = () => {
  const { gameState, setGameState } = useContext(GameContext)!;
  const navigate = useNavigate();

  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin",
    health: 50,
    attack: 10,
    strength: 8,
    dexterity: 12,
    constitution: 10,
    intelligence: 6,
    wisdom: 6,
    charisma: 5,
  });

  // Track the active participant taking action
  const [activeParticipantIndex, setActiveParticipantIndex] = useState(0);

  // Combat log to display actions
  const [combatLog, setCombatLog] = useState<string[]>([]);

  // Determine the order of moves based on dexterity
  const determineMoveOrder = () => {
    const participants = [
      ...gameState.party.map((member, index) => ({
        type: "party",
        index,
        dexterity: member.dexterity,
        name: member.name,
      })),
      { type: "enemy", dexterity: enemy.dexterity, name: enemy.name },
    ];

    participants.sort((a, b) => b.dexterity - a.dexterity);
    return participants;
  };

  const moveOrder = determineMoveOrder();

  const handleAttack = () => {
    const participant = moveOrder[activeParticipantIndex];

    if (participant.type === "party" && "index" in participant) {
      const member = gameState.party[participant.index];
      const damage = Math.floor(Math.random() * member.attack);
      setEnemy((prevEnemy) => ({
        ...prevEnemy,
        health: prevEnemy.health - damage > 0 ? prevEnemy.health - damage : 0,
      }));

      setCombatLog((prevLog) => [
        ...prevLog,
        `${member.name} attacked the ${enemy.name} for ${damage} damage!`,
      ]);
    } else {
      // Enemy's turn
      const targetIndex = moveOrder.findIndex(
        (p) => p.type === "party" && "index" in p
      );
      if (targetIndex !== -1) {
        const target = moveOrder[targetIndex];
        if ("index" in target) {
          // Ensure target has an index
          const playerDamage = enemy.attack;
          const updatedParty = [...gameState.party];
          updatedParty[target.index].health -= playerDamage;

          setGameState((prevState) => ({
            ...prevState,
            party: updatedParty,
          }));

          setCombatLog((prevLog) => [
            ...prevLog,
            `The ${enemy.name} attacked ${
              gameState.party[target.index].name
            } for ${playerDamage} damage!`,
          ]);
        }
      }
    }

    if (enemy.health <= 0) {
      setCombatLog((prevLog) => [
        ...prevLog,
        `The ${enemy.name} has been defeated!`,
      ]);
    }

    if (gameState.party.every((member) => member.health <= 0)) {
      setTimeout(() => {
        navigate("/locations"); // Go back to locations after the entire party is defeated
      }, 2000);
    } else {
      setActiveParticipantIndex(
        (prevIndex) => (prevIndex + 1) % moveOrder.length
      ); // Move to the next participant
    }
  };

  const handleSkill = () => {
    // Implement skill logic here
    setCombatLog((prevLog) => [
      ...prevLog,
      "Skill used! (Implement skill logic)",
    ]);
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  const handleItem = () => {
    // Implement item usage logic here
    setCombatLog((prevLog) => [
      ...prevLog,
      "Item used! (Implement item logic)",
    ]);
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  const handleRun = () => {
    // Implement run logic here
    setCombatLog((prevLog) => [
      ...prevLog,
      "Attempted to run! (Implement run logic)",
    ]);
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  // Automatically handle enemy's turn
  useEffect(() => {
    const currentParticipant = moveOrder[activeParticipantIndex];
    if (currentParticipant.type === "enemy") {
      handleAttack();
    }
  }, [activeParticipantIndex]);

  return (
    <div className="battle">
      <h1>Battle: {enemy.name}</h1>
      <div className="turn-order">
        <h2>Turn Order</h2>
        <ul>
          {moveOrder.map((participant, index) => (
            <li key={index}>
              {activeParticipantIndex === index ? "-> " : ""}
              {participant.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="party-stats">
        <h2>Your Party</h2>
        {gameState.party.map((member, index) => {
          const currentParticipant = moveOrder[activeParticipantIndex];
          const isActive =
            currentParticipant.type === "party" &&
            "index" in currentParticipant &&
            currentParticipant.index === index;
          return (
            <div
              key={index}
              className={`party-member ${isActive ? "active" : ""}`}
            >
              <p>
                {isActive ? "-> " : ""}
                {member.name} - Health: {member.health}
              </p>
            </div>
          );
        })}
      </div>
      <div className="enemy-stats">
        <h2>Enemy</h2>
        <p>
          {moveOrder[activeParticipantIndex].type === "enemy" ? "-> " : ""}
          {enemy.name} Health: {enemy.health}
        </p>
      </div>
      <div className="actions">
        <button onClick={handleAttack} disabled={enemy.health === 0}>
          Attack
        </button>
        <button onClick={handleSkill} disabled={enemy.health === 0}>
          Skill
        </button>
        <button onClick={handleItem} disabled={enemy.health === 0}>
          Item
        </button>
        <button onClick={handleRun} disabled={enemy.health === 0}>
          Run
        </button>
      </div>
      <div className="combat-log">
        <h3>Combat Log</h3>
        <ul>
          {combatLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Battle;
