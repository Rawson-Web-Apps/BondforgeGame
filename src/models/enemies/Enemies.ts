import { CharacterClass } from "../class/CharacterClass";
import { GoblinClass, OrcClass, TrollClass } from "../class/EnemyClasses";
import {
  Dagger,
  LeatherHelmet,
  LeatherChestplate,
  LeatherLeggings,
  LeatherBoots,
  Club,
  ChainmailHelmet,
  ChainmailChestplate,
  ChainmailLeggings,
  ChainmailBoots,
  Hammer,
  PlateHelmet,
  PlateChestplate,
  PlateLeggings,
  PlateBoots,
  Equipment,
} from "../Equipment";

export type EnemyConfig = {
  name: string;
  classType: CharacterClass; // Adjust the type based on your class hierarchy
  skills: string[];
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  attack: number;
  equipment: {
    mainHand: Equipment; // Adjust based on your equipment types
    head: Equipment;
    chest: Equipment;
    legs: Equipment;
    boots: Equipment;
  };
  levelRange: [number, number]; // Minimum and maximum character levels for selection
};

// Define different enemy types
export const enemyConfigs: EnemyConfig[] = [
  {
    name: "Goblin",
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
    levelRange: [1, 5],
  },
  {
    name: "Orc",
    classType: new OrcClass(),
    skills: ["Berserk"],
    stats: {
      strength: 14,
      dexterity: 10,
      constitution: 12,
      intelligence: 5,
      wisdom: 5,
      charisma: 6,
    },
    attack: 15,
    equipment: {
      mainHand: new Club("Orc Club", 7),
      head: new ChainmailHelmet("Orc Chainmail Helmet", 3),
      chest: new ChainmailChestplate("Orc Chainmail Chestplate", 4),
      legs: new ChainmailLeggings("Orc Chainmail Leggings", 3),
      boots: new ChainmailBoots("Orc Chainmail Boots", 2),
    },
    levelRange: [1, 8],
  },
  {
    name: "Troll",
    classType: new TrollClass(),
    skills: ["Regenerate"],
    stats: {
      strength: 18,
      dexterity: 8,
      constitution: 16,
      intelligence: 4,
      wisdom: 4,
      charisma: 3,
    },
    attack: 20,
    equipment: {
      mainHand: new Hammer("Troll Hammer", 10),
      head: new PlateHelmet("Troll Plate Helmet", 4),
      chest: new PlateChestplate("Troll Plate Chestplate", 5),
      legs: new PlateLeggings("Troll Plate Leggings", 4),
      boots: new PlateBoots("Troll Plate Boots", 3),
    },
    levelRange: [1, 12],
  },
  // Add more enemies as needed
];
