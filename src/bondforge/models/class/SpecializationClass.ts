import { ArmorType, WeaponType } from "../Equipment";
import { ElementType, Skill } from "../skill/Skill";

export class SpecializationClass {
  name: string;
  allowedWeapons: WeaponType[];
  allowedArmor: ArmorType[];
  skills: Skill[];
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  strengths: ElementType[];
  weaknesses: ElementType[];

  constructor({
    name,
    allowedWeapons,
    allowedArmor,
    skills,
    stats,
    strengths,
    weaknesses,
  }: {
    name: string;
    allowedWeapons: WeaponType[];
    allowedArmor: ArmorType[];
    skills: Skill[];
    stats: {
      strength: number;
      dexterity: number;
      constitution: number;
      intelligence: number;
      wisdom: number;
      charisma: number;
    };
    strengths: ElementType[];
    weaknesses: ElementType[];
  }) {
    this.name = name;
    this.allowedWeapons = allowedWeapons;
    this.allowedArmor = allowedArmor;
    this.skills = skills;
    this.stats = stats;
    this.strengths = strengths;
    this.weaknesses = weaknesses;
  }
}
