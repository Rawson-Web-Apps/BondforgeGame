import Character from "../models/Character";

export interface GameState {
  playerName: string;
  party: Character[];
  location: string;
  enemies: Character[];
}
