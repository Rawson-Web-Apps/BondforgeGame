import { useContext, useState, useEffect, useCallback, useMemo } from "react";
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
  const basePath = "/";
  return {
    fullImage: `${basePath}${className}.png`,
    faceImage: `${basePath}${className}_turn.png`,
  };
};

type Participant = {
  type: string;
  dexterity: number;
  name: string;
  faceImage: string;
  index?: number; // Make index optional
};

const isPartyMember = (
  participant: Participant
): participant is Participant & { index: number } => {
  return participant.type === "party" && participant.index !== undefined;
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
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number | null>(
    null
  );
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(
    null
  );

  const determineMoveOrder = useCallback(() => {
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
  }, [gameState, enemy]);

  const moveOrder = useMemo(() => determineMoveOrder(), [determineMoveOrder]);

  const handleAttack = () => {
    setSelectedSkill(null); // Ensure no skill is selected
    setSelectingTarget(true);
  };

  const handleSkillButton = () => {
    setSelectingSkill(true);
    setSelectedSkillIndex(0); // Initialize to the first skill
  };

  const handleSkillSelection = (skillName: string) => {
    setSelectedSkill(skillName);
    setSelectingSkill(false);
    setSelectingTarget(true);
    setSelectedSkillIndex(null); // Reset skill selection
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

  const handleTargetSelection = useCallback(
    (target: Character) => {
      if (selectedSkill) {
        handleSkillExecution(target);
      } else {
        handleAttackExecution(target);
      }
      setSelectedTargetIndex(null); // Reset target selection
    },
    [selectedSkill, handleSkillExecution, handleAttackExecution]
  );

  const handleTargetHover = (index: number) => {
    setSelectedTargetIndex(index);
  };

  const handleActionSelection = useCallback(
    (action: string) => {
      if (action === "attack") {
        handleAttack();
      } else if (action === "skill") {
        handleSkillButton();
      }
      setSelectedActionIndex(0); // Reset action selection
    },
    [handleAttack, handleSkillButton]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (selectingTarget) {
        const partyLength = gameState.party.length;
        let newIndex = selectedTargetIndex ?? 0;

        switch (event.key) {
          case "w":
            if (newIndex < partyLength) {
              newIndex = (newIndex - 1 + partyLength) % partyLength;
            }
            break;
          case "s":
            if (newIndex < partyLength) {
              newIndex = (newIndex + 1) % partyLength;
            }
            break;
          case "a":
            if (newIndex >= partyLength) {
              newIndex = 0; // Switch to the first party member
            }
            break;
          case "d":
            if (newIndex < partyLength) {
              newIndex = partyLength; // Switch to the enemy
            }
            break;
          case "Enter":
            if (newIndex === partyLength) {
              handleTargetSelection(enemy);
            } else {
              handleTargetSelection(gameState.party[newIndex]);
            }
            break;
          default:
            return;
        }

        setSelectedTargetIndex(newIndex);
      } else if (selectingSkill) {
        const currentParticipant = moveOrder[activeParticipantIndex];
        if (isPartyMember(currentParticipant)) {
          const skills =
            gameState.party[currentParticipant.index]?.skills || [];
          const maxSkillIndex = skills.length - 1;
          let newSkillIndex = selectedSkillIndex ?? 0;

          switch (event.key) {
            case "a":
              newSkillIndex =
                (newSkillIndex - 1 + maxSkillIndex + 1) % (maxSkillIndex + 1);
              break;
            case "d":
              newSkillIndex = (newSkillIndex + 1) % (maxSkillIndex + 1);
              break;
            case "Enter":
              handleSkillSelection(skills[newSkillIndex]);
              break;
            default:
              return;
          }

          setSelectedSkillIndex(newSkillIndex);
        }
      } else {
        const maxActionIndex = 1; // Assuming two actions: Attack and Skill
        let newActionIndex = selectedActionIndex ?? 0;

        switch (event.key) {
          case "a":
            newActionIndex =
              (newActionIndex - 1 + maxActionIndex + 1) % (maxActionIndex + 1);
            break;
          case "d":
            newActionIndex = (newActionIndex + 1) % (maxActionIndex + 1);
            break;
          case "Enter":
            if (newActionIndex === 0) {
              handleActionSelection("attack");
            } else if (newActionIndex === 1) {
              handleActionSelection("skill");
            }
            break;
          default:
            return;
        }

        setSelectedActionIndex(newActionIndex);
      }
    },
    [
      selectingTarget,
      selectedTargetIndex,
      selectingSkill,
      selectedSkillIndex,
      selectedActionIndex,
      gameState,
      moveOrder,
      activeParticipantIndex,
      enemy,
      handleTargetSelection,
      handleActionSelection,
    ]
  );

  const handleEnemyTurn = useCallback(() => {
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
  }, [gameState, enemy, moveOrder, setGameState]);

  useEffect(() => {
    const currentParticipant = moveOrder[activeParticipantIndex];
    if (currentParticipant.type === "enemy") {
      handleEnemyTurn();
    }
  }, [activeParticipantIndex, handleEnemyTurn, moveOrder]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
              <div
                key={index}
                className={`party-member ${
                  selectingTarget && selectedTargetIndex === index
                    ? "selected"
                    : ""
                }`}
                onMouseEnter={() => handleTargetHover(index)}
                onClick={() => handleTargetSelection(member)}
              >
                <img
                  src={fullImage}
                  alt={member.name}
                  className="character-image"
                />
                <div className="character-stats">
                  <p>{member.name}</p>
                  <p>
                    HP: {member.currentHp} / {member.maxHp}
                  </p>
                  <p>
                    MP: {member.currentMp} / {member.maxMp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="enemy-column">
          <h2>Enemy</h2>
          <div
            className={`enemy-member ${
              selectingTarget && selectedTargetIndex === gameState.party.length
                ? "selected"
                : ""
            }`}
            onMouseEnter={() => handleTargetHover(gameState.party.length)}
            onClick={() => handleTargetSelection(enemy)}
          >
            <img
              src={getImagePaths(enemy.classType.name.toLowerCase()).fullImage}
              alt={enemy.name}
              className="character-image"
            />
            <div className="character-stats">
              <p>{enemy.name}</p>
              <p>
                HP: {enemy.currentHp} / {enemy.maxHp}
              </p>
              <p>
                MP: {enemy.currentMp} / {enemy.maxMp}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="actions">
        {selectingTarget ? (
          <div className="target-selection">
            <h3>Select a target:</h3>
            {/* Removed buttons for target selection */}
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
                  className={selectedSkillIndex === index ? "selected" : ""}
                >
                  {skillName}
                </button>
              ))}
          </div>
        ) : (
          <div className="action-buttons">
            {moveOrder[activeParticipantIndex].type === "party" &&
              "index" in moveOrder[activeParticipantIndex] && (
                <>
                  <button
                    onClick={handleAttack}
                    className={selectedActionIndex === 0 ? "selected" : ""}
                    disabled={enemy.currentHp === 0}
                  >
                    Attack
                  </button>
                  <button
                    onClick={handleSkillButton}
                    className={selectedActionIndex === 1 ? "selected" : ""}
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
          </div>
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
