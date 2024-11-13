import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import SkillManager from "../managers/SkillManager";
import { skills } from "../models/skill/Skills";
import Character from "../models/Character";
import { GoblinClass } from "../models/class/EnemyClasses";
import {
  Dagger,
  LeatherHelmet,
  LeatherChestplate,
  LeatherLeggings,
  LeatherBoots,
} from "../models/Equipment";
import "./Battle.css"; // Import the CSS file for styling

// Function to get image paths based on class name
const getImagePaths = (className: string) => {
  const basePath = "/public/";
  return {
    fullImage: `${basePath}${className}.png`,
    faceImage: `${basePath}${className}_turn.png`,
  };
};

const Battle = () => {
  const { gameState, setGameState } = useContext(GameContext)!;

  const [enemy, setEnemy] = useState<Character>(
    new Character({
      name: "Goblin",
      level: 1,
      experience: 0,
      classType: new GoblinClass(),
      skills: ["Sneak Attack"],
      stats: {
        strength: 8,
        dexterity: 12,
        constitution: 10,
        intelligence: 6,
        wisdom: 6,
        charisma: 5,
      },
      attack: 10,
      equipment: {
        mainHand: new Dagger("Goblin Dagger", 5),
        head: new LeatherHelmet("Goblin Leather Helmet", 2),
        chest: new LeatherChestplate("Goblin Leather Chestplate", 3),
        legs: new LeatherLeggings("Goblin Leather Leggings", 2),
        boots: new LeatherBoots("Goblin Leather Boots", 1),
      },
    })
  );

  const [activeParticipantIndex, setActiveParticipantIndex] = useState(0);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [selectingTarget, setSelectingTarget] = useState(false);
  const [selectingSkill, setSelectingSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const determineMoveOrder = () => {
    const participants = [
      ...gameState.party.map((member, index) => {
        const { faceImage } = getImagePaths(
          member.classType.name.toLowerCase()
        );
        return {
          type: "party",
          index,
          dexterity: member.stats.dexterity,
          name: member.name,
          faceImage,
        };
      }),
      {
        type: "enemy",
        dexterity: enemy.stats.dexterity,
        name: enemy.name,
        faceImage: getImagePaths(enemy.classType.name.toLowerCase()).faceImage,
      },
    ];

    participants.sort((a, b) => b.dexterity - a.dexterity);
    return participants;
  };

  const moveOrder = determineMoveOrder();

  const handleAttack = () => {
    setSelectedSkill(null); // Ensure no skill is selected
    setSelectingTarget(true);
  };

  const handleSkillButton = () => {
    setSelectingSkill(true);
  };

  const handleSkillSelection = (skillName: string) => {
    setSelectedSkill(skillName);
    setSelectingSkill(false);
    setSelectingTarget(true);
  };

  const handleTargetSelection = (target: Character) => {
    if (selectedSkill) {
      handleSkillExecution(target);
    } else {
      handleAttackExecution(target);
    }
  };

  const handleAttackExecution = (target: Character) => {
    const currentParticipant = moveOrder[activeParticipantIndex];

    if (currentParticipant.type === "party" && "index" in currentParticipant) {
      const attacker = gameState.party[currentParticipant.index];
      const damage = Math.max(
        attacker.calculateDamage() - target.calculateDefense(),
        1
      );

      if (target === enemy) {
        setEnemy((prevEnemy) => {
          const updatedEnemy = new Character(prevEnemy);
          updatedEnemy.updateCurrentHp(prevEnemy.currentHp - damage);
          return updatedEnemy;
        });
      } else {
        const updatedParty = gameState.party.map((member) => {
          if (member === target) {
            member.updateCurrentHp(member.currentHp - damage);
          }
          return member;
        });
        setGameState((prevState) => ({
          ...prevState,
          party: updatedParty,
        }));
      }

      setCombatLog((prevLog) => [
        ...prevLog,
        `${attacker.name} attacks ${target.name} for ${damage} damage!`,
      ]);

      if (target.currentHp <= 0) {
        setCombatLog((prevLog) => [
          ...prevLog,
          `${target.name} has been defeated!`,
        ]);
      }
    }

    setSelectingTarget(false);
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  const handleSkillExecution = (target: Character) => {
    if (!selectedSkill) return;

    const moveOrder = determineMoveOrder();
    const participant = moveOrder[activeParticipantIndex];

    if (participant.type === "party" && "index" in participant) {
      const member = gameState.party[participant.index];
      const skill = skills[selectedSkill.toLowerCase() as keyof typeof skills];

      if (!skill) {
        console.error(`Skill not found: ${selectedSkill}`);
        return;
      }

      const logMessage = SkillManager.executeSkill(skill, member, target);
      setCombatLog((prevLog) => [...prevLog, logMessage]);
    }

    setSelectedSkill(null);
    setSelectingTarget(false);
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  useEffect(() => {
    const currentParticipant = moveOrder[activeParticipantIndex];
    if (currentParticipant.type === "enemy") {
      handleEnemyTurn();
    }
  }, [activeParticipantIndex]);

  const handleEnemyTurn = () => {
    const targetIndex = gameState.party.reduce(
      (lowestHpIndex, member, index) => {
        return member.currentHp < gameState.party[lowestHpIndex].currentHp
          ? index
          : lowestHpIndex;
      },
      0
    );

    const target = new Character(gameState.party[targetIndex]);

    const damage = Math.max(
      enemy.calculateDamage() - target.calculateDefense(),
      1
    );

    const updatedParty = gameState.party.map((member, index) => {
      if (index === targetIndex) {
        member.updateCurrentHp(Math.max(member.currentHp - damage, 0));
      }
      return member;
    });

    setGameState((prevState) => ({
      ...prevState,
      party: updatedParty,
    }));

    setCombatLog((prevLog) => [
      ...prevLog,
      `${enemy.name} attacks ${target.name} for ${damage} damage!`,
    ]);

    if (target.currentHp <= 0) {
      setCombatLog((prevLog) => [
        ...prevLog,
        `${target.name} has been defeated!`,
      ]);
    }

    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
  };

  return (
    <div className="battle">
      <h1>Battle: {enemy.name}</h1>
      <div className="turn-order">
        {moveOrder.map((participant, index) => (
          <div
            key={index}
            className={`turn-order-item ${
              activeParticipantIndex === index ? "active" : ""
            }`}
          >
            <img
              src={participant.faceImage}
              alt={participant.name}
              className="turn-order-image"
            />
          </div>
        ))}
      </div>
      <div className="battle-field">
        <div className="party-column">
          <h2>Your Party</h2>
          {gameState.party.map((member, index) => {
            const { fullImage } = getImagePaths(
              member.classType.name.toLowerCase()
            );
            return (
              <div key={index} className="party-member">
                <img
                  src={fullImage}
                  alt={member.name}
                  className="character-image"
                />
                <div className="character-stats">
                  <p>{member.name}</p>
                  <p>HP: {member.currentHp}</p>
                  <p>MP: {member.mp}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="enemy-column">
          <h2>Enemy</h2>
          <div className="enemy-member">
            <img
              src={getImagePaths(enemy.classType.name.toLowerCase()).fullImage}
              alt={enemy.name}
              className="character-image"
            />
            <div className="character-stats">
              <p>{enemy.name}</p>
              <p>HP: {enemy.currentHp}</p>
              <p>MP: {enemy.mp}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="actions">
        {selectingTarget ? (
          <div className="target-selection">
            <h3>Select a target:</h3>
            <button onClick={() => handleTargetSelection(enemy)}>Enemy</button>
            {gameState.party.map((member, index) => (
              <button
                key={index}
                onClick={() => handleTargetSelection(member)}
                disabled={member.currentHp <= 0}
              >
                {member.name}
              </button>
            ))}
          </div>
        ) : selectingSkill ? (
          <div className="skill-selection">
            <h3>Select a skill:</h3>
            {moveOrder[activeParticipantIndex].type === "party" &&
              "index" in moveOrder[activeParticipantIndex] &&
              gameState.party[
                moveOrder[activeParticipantIndex].index
              ]?.skills.map((skillName: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSkillSelection(skillName)}
                >
                  {skillName}
                </button>
              ))}
          </div>
        ) : (
          <>
            {moveOrder[activeParticipantIndex].type === "party" &&
              "index" in moveOrder[activeParticipantIndex] && (
                <>
                  <button
                    onClick={handleAttack}
                    disabled={enemy.currentHp === 0}
                  >
                    Attack
                  </button>
                  <button
                    onClick={handleSkillButton}
                    disabled={enemy.currentHp === 0}
                  >
                    Skill
                  </button>
                </>
              )}
            {moveOrder[activeParticipantIndex].type === "enemy" && (
              <>
                <button
                  onClick={() => console.log("Item logic here")}
                  disabled={enemy.currentHp === 0}
                >
                  Item
                </button>
                <button
                  onClick={() => console.log("Run logic here")}
                  disabled={enemy.currentHp === 0}
                >
                  Run
                </button>
              </>
            )}
          </>
        )}
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
