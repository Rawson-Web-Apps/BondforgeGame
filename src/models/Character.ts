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

export class Character {
  name: string;
  level: number;
  experience: number;
  classType: CharacterClass;
  skills: string[];
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
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
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    attack,
    equipment,
  }: {
    name: string;
    level: number;
    experience: number;
    classType: CharacterClass;
    skills: string[];
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
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
    this.level = level;
    this.experience = experience;
    this.classType = classType;
    this.skills = skills;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.attack = attack;
    this.equipment = equipment;
    this.maxHp = this.calculateHp();
    this.currentHp = this.maxHp; // Initialize currentHp to maxHp
    this.mp = this.calculateMp();
  }

  private calculateHp(): number {
    return this.constitution * 10; // Example: 10 HP per point of constitution
  }

  private calculateMp(): number {
    return this.wisdom * 5; // Example: 5 MP per point of wisdom
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
    return this.strength + weaponDamage;
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

  // Additional methods for character logic can be added here
}

export default Character;
