import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { GameContext } from "../context/GameContext";
import SkillManager from "../managers/SkillManager";
import { skills } from "../models/skill/Skills";
import Character from "../models/Character";
import { getRandomEnemies } from "../models/enemies/EnemyFactory";
import "./Battle.css"; // Import the CSS file for styling
import { SkillType } from "../models/skill/Skill";

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

  // Calculate character levels
  const characterLevels = gameState.party.map((member) => member.level);

  // Initialize multiple enemies
  const [enemies, setEnemies] = useState<Character[]>(() =>
    getRandomEnemies(characterLevels)
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
  const [isAttacking, setIsAttacking] = useState(false);
  const [targetToShake, setTargetToShake] = useState<number | null>(null);
  const [swordPosition, setSwordPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  /**
   * Determines the move order based on dexterity of participants.
   * Includes all party members and enemies.
   */
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
      ...enemies.map((enemy, index) => ({
        type: "enemy",
        index, // Index within the enemies array
        dexterity: enemy.stats.dexterity,
        name: enemy.name,
        faceImage: getImagePaths(enemy.classType.name.toLowerCase()).faceImage,
      })),
    ];

    participants.sort((a, b) => b.dexterity - a.dexterity);
    return participants;
  }, [gameState.party, enemies]);

  const moveOrder = useMemo(() => determineMoveOrder(), [determineMoveOrder]);

  const handleAttack = useCallback(() => {
    setSelectingTarget(true);
    setSelectedTargetIndex(gameState.party.length); // Default to the first enemy
  }, [gameState.party.length]);

  const handleSkillButton = useCallback(() => {
    setSelectingSkill(true);
    setSelectedSkillIndex(0); // Initialize to the first skill
  }, []);

  const handleSkillSelection = useCallback(
    (skillName: string) => {
      setSelectedSkill(skillName);
      setSelectingSkill(false);
      setSelectingTarget(true);

      // Determine if the skill is an attack or support
      const skill = skills[skillName.toLowerCase() as keyof typeof skills];
      if (skill && skill.type === SkillType.Attack) {
        // Default to the first enemy
        setSelectedTargetIndex(gameState.party.length); // First enemy index
      } else {
        // Default to the first party member
        setSelectedTargetIndex(0);
      }
    },
    [gameState.party.length]
  );

  /**
   * Executes an attack on the selected target.
   * @param target - The Character being attacked
   */
  const handleAttackExecution = useCallback(
    (target: Character) => {
      // Determine target index: party members are indexed 0 to N-1, enemies are indexed N to N+M-1
      const targetIndex = enemies.includes(target)
        ? gameState.party.length + enemies.indexOf(target)
        : gameState.party.indexOf(target);

      const targetElement = document.querySelector(
        `.character-${targetIndex}`
      ) as HTMLElement;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        setSwordPosition({ top: centerY, left: rect.left });
      }

      setIsAttacking(true);
      setTargetToShake(targetIndex);

      setTimeout(() => {
        // Perform the attack logic after the animation
        const currentParticipant = moveOrder[activeParticipantIndex];

        if (
          currentParticipant.type === "party" &&
          "index" in currentParticipant
        ) {
          const attacker = gameState.party[currentParticipant.index];
          const damage = Math.max(
            attacker.calculateDamage() - target.calculateDefense(),
            1
          );

          if (enemies.includes(target)) {
            const enemyIdx = enemies.indexOf(target);
            setEnemies((prevEnemies) => {
              const updatedEnemies = [...prevEnemies];
              updatedEnemies[enemyIdx].updateCurrentHp(
                prevEnemies[enemyIdx].currentHp - damage
              );
              return updatedEnemies;
            });
            setCombatLog((prevLog) => [
              ...prevLog,
              `${attacker.name} attacks ${target.name} for ${damage} damage!`,
            ]);
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
            setCombatLog((prevLog) => [
              ...prevLog,
              `${attacker.name} attacks ${target.name} for ${damage} damage!`,
            ]);
          }

          if (target.currentHp <= 0) {
            setCombatLog((prevLog) => [
              ...prevLog,
              `${target.name} has been defeated!`,
            ]);

            // Remove the defeated enemy from the enemies array
            if (enemies.includes(target)) {
              setEnemies((prevEnemies) =>
                prevEnemies.filter((enemy) => enemy !== target)
              );
            }
          }
        }

        setSelectingTarget(false);
        setActiveParticipantIndex(
          (prevIndex) => (prevIndex + 1) % moveOrder.length
        );

        setIsAttacking(false);
        setTargetToShake(null);
        setSwordPosition(null);
      }, 500); // Match the duration of the sword swing animation
    },
    [activeParticipantIndex, enemies, gameState, moveOrder, setGameState]
  );

  /**
   * Executes a skill on the selected target.
   * @param target - The Character being targeted by the skill
   */
  const handleSkillExecution = useCallback(
    (target: Character) => {
      if (!selectedSkill) return;

      const moveOrder = determineMoveOrder();
      const participant = moveOrder[activeParticipantIndex];

      if (participant.type === "party" && "index" in participant) {
        const member = gameState.party[participant.index];
        const skill =
          skills[selectedSkill.toLowerCase() as keyof typeof skills];

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
    },
    [selectedSkill, activeParticipantIndex, determineMoveOrder, gameState.party]
  );

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
        const enemiesLength = enemies.length;
        let newIndex = selectedTargetIndex ?? 0;

        switch (event.key) {
          case "w":
            if (newIndex < partyLength) {
              // Cycle within party members
              newIndex = (newIndex - 1 + partyLength) % partyLength;
            } else {
              // Cycle within enemies
              newIndex =
                partyLength +
                ((newIndex - partyLength - 1 + enemiesLength) % enemiesLength);
            }
            break;
          case "s":
            if (newIndex < partyLength) {
              // Cycle within party members
              newIndex = (newIndex + 1) % partyLength;
            } else {
              // Cycle within enemies
              newIndex =
                partyLength + ((newIndex - partyLength + 1) % enemiesLength);
            }
            break;
          case "a":
            if (newIndex >= partyLength) {
              // Switch to the first party member
              newIndex = 0;
            }
            break;
          case "d":
            if (newIndex < partyLength) {
              // Switch to the first enemy
              newIndex = partyLength;
            }
            break;
          case "Enter":
            if (newIndex < partyLength) {
              handleTargetSelection(gameState.party[newIndex]);
            } else {
              handleTargetSelection(enemies[newIndex - partyLength]);
            }
            break;
          default:
            return;
        }

        setSelectedTargetIndex(newIndex);
      } else if (selectingSkill) {
        // Access skills based on the current participant in the moveOrder
        const currentParticipant = moveOrder[activeParticipantIndex];
        let skills: string[] = [];

        if (
          currentParticipant.type === "party" &&
          "index" in currentParticipant
        ) {
          skills = gameState.party[currentParticipant.index]?.skills || [];
        }

        let newSkillIndex = selectedSkillIndex ?? 0;

        switch (event.key) {
          case "w":
            newSkillIndex = (newSkillIndex - 1 + skills.length) % skills.length;
            break;
          case "s":
            newSkillIndex = (newSkillIndex + 1) % skills.length;
            break;
          case "Enter":
            if (skills[newSkillIndex]) {
              handleSkillSelection(skills[newSkillIndex]);
            }
            break;
          default:
            return;
        }

        setSelectedSkillIndex(newSkillIndex);
      } else {
        // Handle action selection
        const actions = ["attack", "skill"];
        let newActionIndex = selectedActionIndex;

        switch (event.key) {
          case "w":
            newActionIndex =
              (newActionIndex - 1 + actions.length) % actions.length;
            break;
          case "s":
            newActionIndex = (newActionIndex + 1) % actions.length;
            break;
          case "Enter":
            handleActionSelection(actions[newActionIndex]);
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
      gameState.party,
      enemies,
      handleTargetSelection,
      selectedActionIndex,
      handleActionSelection,
      selectedSkillIndex,
      handleSkillSelection,
      moveOrder,
      activeParticipantIndex,
    ]
  );

  /**
   * Handles enemy turns by attacking the party member with the lowest HP.
   */
  const handleEnemyTurn = useCallback(() => {
    // Choose the party member with the lowest HP
    const targetIndex = gameState.party.reduce(
      (lowestHpIndex, member, index) => {
        return member.currentHp < gameState.party[lowestHpIndex].currentHp
          ? index
          : lowestHpIndex;
      },
      0
    );

    const target = gameState.party[targetIndex];

    // Identify which enemy is currently acting
    const enemyActing = moveOrder[activeParticipantIndex];
    const enemyIndex = enemyActing.index!; // Safe assertion since type is enemy
    const enemyCharacter = enemies[enemyIndex];

    const damage = Math.max(
      enemyCharacter.calculateDamage() - target.calculateDefense(),
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
      `${enemyCharacter.name} attacks ${target.name} for ${damage} damage!`,
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
  }, [gameState, enemies, moveOrder, setGameState]);

  /**
   * Handles the progression of turns based on the active participant.
   */
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
      <h1>Battle: {enemies.map((enemy) => enemy.name).join(", ")}</h1>
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
                className={`party-member character-${index} ${
                  selectingTarget && selectedTargetIndex === index
                    ? selectedSkill &&
                      skills[selectedSkill.toLowerCase() as keyof typeof skills]
                        .type !== SkillType.Attack
                      ? "support-selected"
                      : "selected"
                    : ""
                } ${targetToShake === index ? "shake" : ""}`}
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
          <h2>Enemies</h2>
          {enemies.map((enemy, index) => {
            const enemyGlobalIndex = gameState.party.length + index;
            return (
              <div
                key={index}
                className={`enemy-member character-${enemyGlobalIndex} ${
                  selectingTarget && selectedTargetIndex === enemyGlobalIndex
                    ? selectedSkill &&
                      skills[selectedSkill.toLowerCase() as keyof typeof skills]
                        .type !== SkillType.Attack
                      ? "support-selected"
                      : "selected"
                    : ""
                } ${targetToShake === enemyGlobalIndex ? "shake" : ""}`}
                onMouseEnter={() => handleTargetHover(enemyGlobalIndex)}
                onClick={() => handleTargetSelection(enemy)}
              >
                <img
                  src={
                    getImagePaths(enemy.classType.name.toLowerCase()).fullImage
                  }
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
            );
          })}
        </div>
      </div>
      {isAttacking && swordPosition && (
        <div
          className="sword-swing"
          style={{ top: swordPosition.top, left: swordPosition.left }}
        ></div>
      )}
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
                    disabled={
                      enemies.length === 0 ||
                      enemies.every((enemy) => enemy.currentHp === 0)
                    }
                  >
                    Attack
                  </button>
                  <button
                    onClick={handleSkillButton}
                    className={selectedActionIndex === 1 ? "selected" : ""}
                    disabled={
                      enemies.length === 0 ||
                      enemies.every((enemy) => enemy.currentHp === 0)
                    }
                  >
                    Skill
                  </button>
                </>
              )}
            {moveOrder[activeParticipantIndex].type === "enemy" && (
              <>
                <button
                  onClick={() => console.log("Item logic here")}
                  disabled={
                    enemies.length === 0 ||
                    enemies.every((enemy) => enemy.currentHp === 0)
                  }
                >
                  Item
                </button>
                <button
                  onClick={() => console.log("Run logic here")}
                  disabled={
                    enemies.length === 0 ||
                    enemies.every((enemy) => enemy.currentHp === 0)
                  }
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
