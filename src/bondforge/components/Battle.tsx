import { useContext } from "react";
import { GameContext } from "../context/ContextExport";
import { SkillType } from "../models/skill/Skill";
import { skills } from "../models/skill/Skills";
import { useBattleActions } from "../hooks/useBattleActions";
import "./Battle.css";

// Function to get image paths based on class name
const getImagePaths = (className: string) => {
  const basePath = "/images/";
  return {
    fullImage: `${basePath}${className}.png`,
    faceImage: `${basePath}${className}_turn.png`,
  };
};

const Battle = () => {
  const { gameState, setGameState } = useContext(GameContext)!;

  const {
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
    handleRun,
  } = useBattleActions(gameState, setGameState);

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
              ]?.skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillSelection(skill.name)}
                  className={selectedSkillIndex === index ? "selected" : ""}
                >
                  {skill.name}
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
                  <button
                    onClick={handleRun}
                    className={selectedActionIndex === 2 ? "selected" : ""}
                  >
                    Run
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
