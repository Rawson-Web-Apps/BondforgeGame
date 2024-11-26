import { useState, useEffect, ReactNode } from "react";
import Character from "../models/Character";
import { GameState } from "./GameContextTypes";
import { GameContext } from "./ContextExport";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = JSON.parse(localStorage.getItem("gameState") || "{}");
    const party: Character[] = [];
    const enemies: Character[] = [];
    if (!savedState.party) {
      return {
        playerName: "",
        party: [],
        location: "",
        enemies: [],
      };
    }
    for (const member of savedState.party) {
      const newMember = new Character(member);
      newMember.updateCurrentHp(member.currentHp);
      newMember.updateCurrentMp(member.currentMp);
      party.push(newMember);
    }
    for (const enemy of savedState.enemies) {
      const newEnemy = new Character(enemy);
      newEnemy.updateCurrentHp(enemy.currentHp);
      newEnemy.updateCurrentMp(enemy.currentMp);
      enemies.push(newEnemy);
    }
    return {
      playerName: savedState.playerName,
      party: party,
      location: savedState.location,
      enemies: enemies,
    };
  });

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
