import React, { createContext, useState, ReactNode } from "react";
import Character from "../models/Character";
import { Warrior, Rogue, Cleric } from "../models/class/HeroClasses";
import {
  OneHandedSword,
  Dagger,
  Staff,
  LeatherHelmet,
  LeatherChestplate,
  LeatherLeggings,
  LeatherBoots,
  ClothHelmet,
  ClothChestplate,
  ClothLeggings,
  ClothBoots,
  Shield,
} from "../models/Equipment";

export interface GameState {
  playerName: string;
  party: Character[];
  location: string;
}

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    playerName: "",
    party: [
      new Character({
        name: "Warrior",
        level: 1,
        experience: 0,
        classType: new Warrior(),
        skills: ["Slash"],
        stats: {
          strength: 15,
          dexterity: 10,
          constitution: 14,
          intelligence: 8,
          wisdom: 8,
          charisma: 10,
        },
        attack: 15,
        equipment: {
          mainHand: new OneHandedSword("Basic Sword", 10),
          offHand: new Shield("Basic Shield", 5),
          head: new LeatherHelmet("Leather Helmet", 2),
          chest: new LeatherChestplate("Leather Chestplate", 5),
          legs: new LeatherLeggings("Leather Leggings", 3),
          boots: new LeatherBoots("Leather Boots", 2),
        },
      }),
      new Character({
        name: "Rogue",
        level: 1,
        experience: 0,
        classType: new Rogue(),
        skills: ["Backstab", "Stealth"],
        stats: {
          strength: 10,
          dexterity: 15,
          constitution: 10,
          intelligence: 10,
          wisdom: 8,
          charisma: 12,
        },
        attack: 20,
        equipment: {
          mainHand: new Dagger("Basic Dagger", 8),
          head: new LeatherHelmet("Leather Hood", 1),
          chest: new LeatherChestplate("Leather Vest", 4),
          legs: new LeatherLeggings("Leather Pants", 2),
          boots: new LeatherBoots("Leather Shoes", 1),
        },
      }),
      new Character({
        name: "Cleric",
        level: 1,
        experience: 0,
        classType: new Cleric(),
        skills: ["Heal", "Smite"],
        stats: {
          strength: 10,
          dexterity: 8,
          constitution: 12,
          intelligence: 10,
          wisdom: 15,
          charisma: 10,
        },
        attack: 10,
        equipment: {
          mainHand: new Staff("Basic Staff", 5),
          head: new ClothHelmet("Cloth Cap", 1),
          chest: new ClothChestplate("Cloth Robe", 3),
          legs: new ClothLeggings("Cloth Pants", 2),
          boots: new ClothBoots("Cloth Shoes", 1),
        },
      }),
    ],
    location: "mainMenu",
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
