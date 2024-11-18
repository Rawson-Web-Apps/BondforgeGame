import { useState, useCallback, useMemo, useEffect } from "react";
import { Character } from "../models/Character";
import { GameState } from "../context/GameContext";
import { SkillType } from "../models/skill/Skill";
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
      ...gameState.party.map((member, index) => ({
        type: "party",
        index,
        dexterity: member.stats.dexterity,
        name: member.name,
        faceImage: `/images/${member.classType.name.toLowerCase()}_turn.png`,
      })),
      ...enemies.map((enemy, index) => ({
        type: "enemy",
        index,
        dexterity: enemy.stats.dexterity,
        name: enemy.name,
        faceImage: `/images/${enemy.classType.name.toLowerCase()}_turn.png`,
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
    setActiveParticipantIndex(
      (prevIndex) => (prevIndex + 1) % moveOrder.length
    );
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

            if (enemies.includes(target)) {
              setEnemies((prevEnemies) =>
                prevEnemies.filter((enemy) => enemy !== target)
              );

              const newMoveOrder = determineMoveOrder();
              setActiveParticipantIndex(
                (prevIndex) => prevIndex % newMoveOrder.length
              );
            }
          }
        }

        setSelectingTarget(false);
        setIsAttacking(false);
        setTargetToShake(null);
        setSwordPosition(null);

        handleTurnEnd();
      }, 500);
    },
    [
      activeParticipantIndex,
      enemies,
      gameState,
      moveOrder,
      setGameState,
      handleTurnEnd,
      determineMoveOrder,
    ]
  );

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
      handleTurnEnd();
    },
    [
      selectedSkill,
      activeParticipantIndex,
      determineMoveOrder,
      gameState.party,
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
    if (currentParticipant.type !== "enemy") {
      console.error("Current participant is not an enemy");
      return;
    }

    const targetIndex = gameState.party.reduce(
      (lowestHpIndex, member, index) => {
        return member.currentHp < gameState.party[lowestHpIndex].currentHp
          ? index
          : lowestHpIndex;
      },
      0
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
        member.updateCurrentHp(Math.max(member.currentHp - damage, 0));
      }
      return member;
    });

    setGameState((prevState) => ({ ...prevState, party: updatedParty }));

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

    handleTurnEnd();
  }, [
    activeParticipantIndex,
    moveOrder,
    gameState,
    enemies,
    handleTurnEnd,
    setGameState,
  ]);

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
