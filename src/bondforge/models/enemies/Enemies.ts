import { SpecializationClass } from "../class/SpecializationClass";
import { GoblinClass, OrcClass, TrollClass } from "../class/EnemyClasses";
import { Skill } from "../skill/Skill";
import { skills } from "../skill/Skills";
import {
  Dagger,
  ArmorType,
  Boots,
  Helmet,
  Chestplate,
  Leggings,
  OneHandedClub,
  TwoHandedHammer,
  CharacterEquipment,
} from "../Equipment";

export type EnemyConfig = {
  name: string;
  classType: SpecializationClass; // Adjust the type based on your class hierarchy
  skills: Skill[];
  attack: number;
  equipment: CharacterEquipment;
  levelRange: [number, number]; // Minimum and maximum character levels for selection
};

// Define different enemy types
export const enemyConfigs: EnemyConfig[] = [
  {
    name: "Goblin",
    classType: new GoblinClass(),
    skills: [skills.backstab],
    attack: 10,
    equipment: {
      mainHand: new Dagger("Goblin Dagger", 5),
      head: new Helmet("Goblin Leather Helmet", 2, ArmorType.Leather),
      chest: new Chestplate("Goblin Leather Chestplate", 3, ArmorType.Leather),
      legs: new Leggings("Goblin Leather Leggings", 2, ArmorType.Leather),
      boots: new Boots("Goblin Leather Boots", 1, ArmorType.Leather),
    },
    levelRange: [1, 5],
  },
  {
    name: "Orc",
    classType: new OrcClass(),
    skills: [skills.berserk],
    attack: 15,
    equipment: {
      mainHand: new OneHandedClub("Orc Club", 7),
      head: new Helmet("Orc Chainmail Helmet", 3, ArmorType.Chainmail),
      chest: new Chestplate("Orc Chainmail Chestplate", 4, ArmorType.Chainmail),
      legs: new Leggings("Orc Chainmail Leggings", 3, ArmorType.Chainmail),
      boots: new Boots("Orc Chainmail Boots", 2, ArmorType.Chainmail),
    },
    levelRange: [1, 8],
  },
  {
    name: "Troll",
    classType: new TrollClass(),
    skills: [skills.berserk],
    attack: 20,
    equipment: {
      mainHand: new TwoHandedHammer("Troll Hammer", 10),
      head: new Helmet("Troll Plate Helmet", 4, ArmorType.Plate),
      chest: new Chestplate("Troll Plate Chestplate", 5, ArmorType.Plate),
      legs: new Leggings("Troll Plate Leggings", 4, ArmorType.Plate),
      boots: new Boots("Troll Plate Boots", 3, ArmorType.Plate),
    },
    levelRange: [1, 12],
  },
  // Add more enemies as needed
];
