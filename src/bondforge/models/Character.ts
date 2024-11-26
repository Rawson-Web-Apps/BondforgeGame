import { SpecializationClass } from "./class/SpecializationClass";
import { Armor, CharacterEquipment, Shield, Weapon } from "./Equipment";
import { Stats } from "./Stats";
import { Skill } from "./skill/Skill";

export class Character {
  name: string;
  level: number;
  experience: number;
  classType: SpecializationClass;
  skills: Skill[];
  stats: Stats;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
  attack: number;
  alive: boolean;
  equipment: CharacterEquipment;

  constructor({
    name,
    experience,
    classType,
    attack,
    equipment = {},
  }: {
    name: string;
    level?: number;
    experience: number;
    classType: SpecializationClass;
    skills: Skill[];
    attack: number;
    alive?: boolean;
    equipment?: CharacterEquipment; // Optional equipment, defaults to an empty object
  }) {
    this.name = name;
    this.experience = experience;
    this.level = this.calculateLevel();
    this.classType = classType;
    this.skills = classType.skills;
    this.stats = classType.stats;
    this.attack = attack;
    this.equipment = equipment;
    if (
      this.equipment.mainHand?.type &&
      !this.classType.allowedWeapons.includes(this.equipment.mainHand.type)
    ) {
      this.equipment.mainHand = undefined;
    }
    if (
      this.equipment.head?.type &&
      !this.classType.allowedArmor.includes(this.equipment.head.type)
    ) {
      this.equipment.head = undefined;
    }
    if (
      this.equipment.chest?.type &&
      !this.classType.allowedArmor.includes(this.equipment.chest.type)
    ) {
      this.equipment.chest = undefined;
    }
    if (
      this.equipment.legs?.type &&
      !this.classType.allowedArmor.includes(this.equipment.legs.type)
    ) {
      this.equipment.legs = undefined;
    }
    if (
      this.equipment.boots?.type &&
      !this.classType.allowedArmor.includes(this.equipment.boots.type)
    ) {
      this.equipment.boots = undefined;
    }
    this.maxHp = this.calculateHp();
    this.currentHp = this.maxHp; // Initialize currentHp to maxHp
    this.maxMp = this.calculateMp();
    this.currentMp = this.maxMp;
    this.alive = true;
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
    this.currentHp = Math.max(0, Math.min(newHp, this.maxHp));
    this.alive = this.currentHp > 0;
  }

  public updateCurrentMp(newMp: number) {
    this.currentMp = Math.max(0, Math.min(newMp, this.maxMp));
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

  public addExperience(exp: number) {
    this.experience += exp;
    const newLevel = this.calculateLevel();
    if (newLevel > this.level) {
      this.levelUp(newLevel);
    }
  }

  private levelUp(newLevel: number) {
    this.level = newLevel;
    this.maxHp = this.calculateHp();
    this.currentHp = this.maxHp; // Reset HP on level up, could also apply a portion of increase if desired
    this.maxMp = this.calculateMp();
    this.currentMp = this.maxMp; // Reset MP similarly
  }

  public equipItem(item: Weapon | Shield | Armor) {
    if (item instanceof Weapon) {
      this.equipment.mainHand = item;
    } else if (item instanceof Shield) {
      this.equipment.offHand = item;
    } // Similarly, handle other cases.

    // Recalculate stats if equipping the item should change them
    this.attack = this.calculateDamage();
  }
}

export default Character;
