import { useState, useCallback, useEffect } from "react";
import { Character } from "../models/Character";
import { GameState } from "../context/GameContext";
import { Skill, SkillType } from "../models/skill/Skill";
import { skills } from "../models/skill/Skills";
import SkillManager from "../managers/SkillManager";
import { getRandomEnemies } from "../models/enemies/EnemyFactory";

export const useBattleActions = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const characterLevels = gameState.party.map((member) => member.level);
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

  const determineMoveOrder = useCallback(() => {
    const participants = [
      ...gameState.party
        .map((member, index) =>
          member.alive
            ? {
                type: "party" as const,
                index,
                dexterity: member.stats.dexterity,
                name: member.name,
                faceImage: `/images/${member.classType.name.toLowerCase()}_turn.png`,
              }
            : null
        )
        .filter(Boolean),
      ...enemies
        .map((enemy, index) =>
          enemy.alive
            ? {
                type: "enemy" as const,
                index,
                dexterity: enemy.stats.dexterity,
                name: enemy.name,
                faceImage: `/images/${enemy.classType.name.toLowerCase()}_turn.png`,
              }
            : null
        )
        .filter(Boolean),
    ] as {
      type: "party" | "enemy";
      index: number;
      dexterity: number;
      name: string;
      faceImage: string;
    }[];

    participants.sort((a, b) => b.dexterity - a.dexterity);
    return participants;
  }, [gameState.party, enemies]);

  const [moveOrder, setMoveOrder] = useState(determineMoveOrder);

  useEffect(() => {
    const newMoveOrder = determineMoveOrder();
    setMoveOrder(newMoveOrder);
  }, [gameState.party, enemies, determineMoveOrder]);

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

      const skill = skills[skillName.toLowerCase() as keyof typeof skills];
      if (skill && skill.type === SkillType.Attack) {
        setSelectedTargetIndex(gameState.party.length); // First enemy index
      } else {
        setSelectedTargetIndex(0);
      }
    },
    [gameState.party.length]
  );

  const handleTurnEnd = useCallback(() => {
    setActiveParticipantIndex((prevIndex) => {
      if (moveOrder.length === 0) return 0; // Handle empty moveOrder

      let nextIndex = (prevIndex + 1) % moveOrder.length;
      return nextIndex;
    });
  }, [moveOrder.length]);

  const handleAttackExecution = useCallback(
    (target: Character) => {
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
        const currentParticipant = moveOrder[activeParticipantIndex];

        if (
          currentParticipant &&
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
              const updatedEnemies = prevEnemies.map((enemy, idx) => {
                if (idx === enemyIdx) {
                  const newCurrentHp = enemy.currentHp - damage;
                  const isAlive = newCurrentHp > 0;
                  if (!isAlive) {
                    setCombatLog((prevLog) => [
                      ...prevLog,
                      `${target.name} has been defeated!`,
                    ]);
                  }
                  // Create a new Character instance
                  const updatedEnemy = new Character({
                    name: enemy.name,
                    level: enemy.level,
                    experience: enemy.experience,
                    classType: enemy.classType,
                    skills: enemy.skills,
                    stats: enemy.stats,
                    attack: enemy.attack,
                    equipment: enemy.equipment,
                  });
                  updatedEnemy.currentHp = newCurrentHp;
                  updatedEnemy.currentMp = enemy.currentMp;
                  updatedEnemy.alive = isAlive;
                  return updatedEnemy;
                }
                return enemy;
              });

              return updatedEnemies;
            });

            setCombatLog((prevLog) => [
              ...prevLog,
              `${attacker.name} attacks ${target.name} for ${damage} damage!`,
            ]);
          } else {
            const updatedParty = gameState.party.map((member) => {
              if (member === target) {
                const newCurrentHp = Math.max(member.currentHp - damage, 0);
                const isAlive = newCurrentHp > 0;
                if (!isAlive) {
                  setCombatLog((prevLog) => [
                    ...prevLog,
                    `${target.name} has been defeated!`,
                  ]);
                }
                // Create a new Character instance
                const updatedMember = new Character({
                  name: member.name,
                  level: member.level,
                  experience: member.experience,
                  classType: member.classType,
                  skills: member.skills,
                  stats: member.stats,
                  attack: member.attack,
                  equipment: member.equipment,
                });
                updatedMember.currentHp = newCurrentHp;
                updatedMember.currentMp = member.currentMp;
                updatedMember.alive = isAlive;
                return updatedMember;
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
        }

        setSelectingTarget(false);
        setIsAttacking(false);
        setTargetToShake(null);
        setSwordPosition(null);

        handleTurnEnd();
      }, 500);
    },
    [activeParticipantIndex, enemies, gameState.party, handleTurnEnd, moveOrder]
  );

  const handleSkillExecution = useCallback(
    (target: Character) => {
      if (!selectedSkill) return;

      const moveOrder = determineMoveOrder();
      const participant = moveOrder[activeParticipantIndex];

      // Check if the participant is still alive
      if (
        !participant ||
        (participant.type === "party" &&
          !gameState.party[participant.index]?.alive) ||
        (participant.type === "enemy" && !enemies[participant.index]?.alive)
      ) {
        console.error("Attempting to execute skill with a dead participant");
        return;
      }

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

        if (enemies.includes(target) && target.currentHp <= 0) {
          setEnemies((prevEnemies) =>
            prevEnemies.map((enemy) => {
              if (enemy === target) {
                // Create a new Character instance
                const updatedEnemy = new Character({
                  name: enemy.name,
                  level: enemy.level,
                  experience: enemy.experience,
                  classType: enemy.classType,
                  skills: enemy.skills,
                  stats: enemy.stats,
                  attack: enemy.attack,
                  equipment: enemy.equipment,
                });
                updatedEnemy.currentHp = 0;
                updatedEnemy.currentMp = enemy.currentMp;
                updatedEnemy.alive = false;
                return updatedEnemy;
              }
              return enemy;
            })
          );
          setCombatLog((prevLog) => [
            ...prevLog,
            `${target.name} has been defeated!`,
          ]);
        }
      }

      setSelectedSkill(null);
      setSelectingTarget(false);
      handleTurnEnd();
    },
    [
      selectedSkill,
      activeParticipantIndex,
      determineMoveOrder,
      gameState.party,
      enemies,
      handleTurnEnd,
    ]
  );

  const handleTargetSelection = useCallback(
    (target: Character) => {
      if (selectedSkill) {
        handleSkillExecution(target);
      } else {
        handleAttackExecution(target);
      }
      setSelectedTargetIndex(null);
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
      setSelectedActionIndex(0);
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
              newIndex = (newIndex - 1 + partyLength) % partyLength;
            } else {
              newIndex =
                partyLength +
                ((newIndex - partyLength - 1 + enemiesLength) % enemiesLength);
            }
            break;
          case "s":
            if (newIndex < partyLength) {
              newIndex = (newIndex + 1) % partyLength;
            } else {
              newIndex =
                partyLength + ((newIndex - partyLength + 1) % enemiesLength);
            }
            break;
          case "a":
            if (newIndex >= partyLength) {
              newIndex = 0;
            }
            break;
          case "d":
            if (newIndex < partyLength) {
              newIndex = partyLength;
            }
            break;
          case "Enter":
            if (selectingTarget) {
              if (newIndex < gameState.party.length) {
                const target = gameState.party[newIndex];
                if (target.alive) {
                  handleTargetSelection(target);
                }
              } else {
                const target = enemies[newIndex - gameState.party.length];
                if (target.alive) {
                  handleTargetSelection(target);
                }
              }
            }
            break;

          default:
            return;
        }

        setSelectedTargetIndex(newIndex);
      } else if (selectingSkill) {
        const currentParticipant = moveOrder[activeParticipantIndex];
        let skills: Skill[] = [];

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
              handleSkillSelection(skills[newSkillIndex].name);
            }
            break;
          default:
            return;
        }

        setSelectedSkillIndex(newSkillIndex);
      } else {
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

  const handleEnemyTurn = useCallback(() => {
    const currentParticipant = moveOrder[activeParticipantIndex];
    if (!currentParticipant || currentParticipant.type !== "enemy") {
      console.error("Current participant is not an enemy or is undefined");
      return;
    }

    const alivePartyMembers = gameState.party.filter((member) => member.alive);
    if (alivePartyMembers.length === 0) {
      console.error("No alive party members to target");
      return;
    }

    const targetIndex = gameState.party.findIndex(
      (member) =>
        member.alive &&
        member.currentHp ===
          Math.min(...alivePartyMembers.map((member) => member.currentHp))
    );

    const target = gameState.party[targetIndex];
    const enemyIndex = currentParticipant.index!;
    const enemyCharacter = enemies[enemyIndex];

    if (!enemyCharacter) {
      console.error("Enemy character is undefined");
      return;
    }

    const damage = Math.max(
      enemyCharacter.calculateDamage() - target.calculateDefense(),
      1
    );

    const updatedParty = gameState.party.map((member, index) => {
      if (index === targetIndex) {
        const newCurrentHp = Math.max(member.currentHp - damage, 0);
        const isAlive = newCurrentHp > 0;
        if (!isAlive) {
          setCombatLog((prevLog) => [
            ...prevLog,
            `${target.name} has been defeated!`,
          ]);
        }
        // Create a new Character instance
        const updatedMember = new Character({
          name: member.name,
          level: member.level,
          experience: member.experience,
          classType: member.classType,
          skills: member.skills,
          stats: member.stats,
          attack: member.attack,
          equipment: member.equipment,
        });
        updatedMember.currentHp = newCurrentHp;
        updatedMember.currentMp = member.currentMp;
        updatedMember.alive = isAlive;
        return updatedMember;
      }
      return member;
    });

    setGameState((prevState) => ({ ...prevState, party: updatedParty }));

    setCombatLog((prevLog) => [
      ...prevLog,
      `${enemyCharacter.name} attacks ${target.name} for ${damage} damage!`,
    ]);

    handleTurnEnd();
  }, [activeParticipantIndex, moveOrder, gameState, enemies, handleTurnEnd]);

  useEffect(() => {
    const currentParticipant = moveOrder[activeParticipantIndex];
    if (currentParticipant && currentParticipant.type === "enemy") {
      handleEnemyTurn();
    }
  }, [activeParticipantIndex, handleEnemyTurn, moveOrder]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    enemies,
    combatLog,
    selectingTarget,
    selectingSkill,
    selectedSkill,
    selectedTargetIndex,
    selectedActionIndex,
    selectedSkillIndex,
    isAttacking,
    targetToShake,
    swordPosition,
    moveOrder,
    activeParticipantIndex,
    handleAttack,
    handleSkillButton,
    handleSkillSelection,
    handleTargetSelection,
    handleTargetHover,
    handleActionSelection,
  };
};
