import {
  ClothHelmet,
  LeatherHelmet,
  ChainmailHelmet,
  PlateHelmet,
  ClothChestplate,
  LeatherChestplate,
  ChainmailChestplate,
  PlateChestplate,
  ClothLeggings,
  LeatherLeggings,
  ChainmailLeggings,
  PlateLeggings,
  ClothBoots,
  LeatherBoots,
  ChainmailBoots,
  PlateBoots,
  OneHandedSword,
  TwoHandedSword,
  Dagger,
  Bow,
  Staff,
  Shield,
  Instrument,
} from "../Equipment";
import { ElementType } from "../skill/Skill";

export abstract class CharacterClass {
  abstract allowedWeapons: (
    | typeof OneHandedSword
    | typeof TwoHandedSword
    | typeof Dagger
    | typeof Bow
    | typeof Staff
    | typeof Instrument
  )[];
  abstract allowedArmor: (
    | typeof ClothHelmet
    | typeof LeatherHelmet
    | typeof ChainmailHelmet
    | typeof PlateHelmet
    | typeof ClothChestplate
    | typeof LeatherChestplate
    | typeof ChainmailChestplate
    | typeof PlateChestplate
    | typeof ClothLeggings
    | typeof LeatherLeggings
    | typeof ChainmailLeggings
    | typeof PlateLeggings
    | typeof ClothBoots
    | typeof LeatherBoots
    | typeof ChainmailBoots
    | typeof PlateBoots
    | typeof Shield
  )[];
  abstract skills: string[];
  abstract statBonuses: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  // New properties for strengths and weaknesses
  strengths: ElementType[] = [];
  weaknesses: ElementType[] = [];

  calculateHealth(baseConstitution: number): number {
    return baseConstitution * 10 + this.statBonuses.constitution * 2;
  }

  calculateAttack(baseStrength: number): number {
    return baseStrength * 2 + this.statBonuses.strength;
  }

  // Method to determine damage multiplier based on strengths and weaknesses
  getDamageMultiplier(element: ElementType): number {
    if (this.strengths.includes(element)) {
      return 0.5; // Take half damage from strong elements
    }
    if (this.weaknesses.includes(element)) {
      return 1.5; // Take 1.5x damage from weak elements
    }
    return 1.0; // Neutral damage
  }
}
