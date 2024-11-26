import { createContext } from "react";
import { GameState } from "./GameContextTypes";

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
