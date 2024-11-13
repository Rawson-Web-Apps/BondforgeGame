import { CharacterClass } from "./class/CharacterClass";
import {
  Weapon,
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
  Shield,
} from "./Equipment";
import { Stats, createDefaultStats } from "./Stats";

export class Character {
  name: string;
  level: number;
  experience: number;
  classType: CharacterClass;
  skills: string[];
  stats: Stats;
  maxHp: number;
  currentHp: number;
  mp: number;
  attack: number;
  equipment: {
    mainHand?: Weapon;
    offHand?: Weapon | Shield;
    head?: ClothHelmet | LeatherHelmet | ChainmailHelmet | PlateHelmet;
    chest?:
      | ClothChestplate
      | LeatherChestplate
      | ChainmailChestplate
      | PlateChestplate;
    legs?: ClothLeggings | LeatherLeggings | ChainmailLeggings | PlateLeggings;
    boots?: ClothBoots | LeatherBoots | ChainmailBoots | PlateBoots;
  };

  constructor({
    name,
    level,
    experience,
    classType,
    skills,
    stats = createDefaultStats(),
    attack,
    equipment,
  }: {
    name: string;
    level?: number;
    experience: number;
    classType: CharacterClass;
    skills: string[];
    stats?: Stats;
    attack: number;
    equipment: {
      mainHand?: Weapon;
      offHand?: Weapon | Shield;
      head?: ClothHelmet | LeatherHelmet | ChainmailHelmet | PlateHelmet;
      chest?:
        | ClothChestplate
        | LeatherChestplate
        | ChainmailChestplate
        | PlateChestplate;
      legs?:
        | ClothLeggings
        | LeatherLeggings
        | ChainmailLeggings
        | PlateLeggings;
      boots?: ClothBoots | LeatherBoots | ChainmailBoots | PlateBoots;
    };
  }) {
    this.name = name;
    this.experience = experience;
    this.level = this.calculateLevel();
    this.classType = classType;
    this.skills = skills;
    this.stats = stats;
    this.attack = attack;
    this.equipment = equipment;
    this.maxHp = this.calculateHp();
    this.currentHp = this.maxHp; // Initialize currentHp to maxHp
    this.mp = this.calculateMp();
  }

  public calculateLevel(): number {
    const maxLevel = 99;
    const baseExp = 0; // Base experience required for level 1
    const growthFactor = 1.1; // Growth factor for experience required per level

    for (let level = 1; level <= maxLevel; level++) {
      const expForNextLevel = baseExp + Math.pow(growthFactor, level - 1) * 100;
      if (this.experience < expForNextLevel) {
        return level;
      }
    }
    return maxLevel; // Return max level if experience exceeds all thresholds
  }

  private calculateHp(): number {
    return this.stats.constitution * 10; // Example: 10 HP per point of constitution
  }

  private calculateMp(): number {
    return this.stats.wisdom * 5; // Example: 5 MP per point of wisdom
  }

  // Method to update current hp if needed
  public updateCurrentHp(newHp: number) {
    this.currentHp = Math.max(0, Math.min(newHp, this.maxHp)); // Ensure hp is within bounds
  }

  // Method to calculate total damage
  public calculateDamage(): number {
    let weaponDamage = 0;
    if (this.equipment.mainHand) {
      weaponDamage += this.equipment.mainHand.damage;
    }
    if (this.equipment.offHand && this.equipment.offHand instanceof Weapon) {
      weaponDamage += this.equipment.offHand.damage;
    }
    return this.stats.strength + weaponDamage;
  }

  // Method to calculate total defense
  public calculateDefense(): number {
    let totalDefense = 0;
    const { head, chest, legs, boots, offHand } = this.equipment;

    if (head) totalDefense += head.defense;
    if (chest) totalDefense += chest.defense;
    if (legs) totalDefense += legs.defense;
    if (boots) totalDefense += boots.defense;
    if (offHand && offHand instanceof Shield) totalDefense += offHand.defense;

    return totalDefense;
  }
}

export default Character;
