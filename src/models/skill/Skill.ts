import Character from "../Character";

// Define the types of skills
export enum SkillType {
  Attack,
  Support,
  Buff,
  Passive,
}

// Define the elemental types
export enum ElementType {
  Physical,
  Fire,
  Ice,
  Lightning,
  Light,
  Dark,
}

// Define a class for skills
export class Skill {
  name: string;
  type: SkillType;
  element: ElementType;
  effect: (target: Character, user: Character) => void;
  cost?: number; // Optional: cost to use the skill (e.g., mana)

  constructor(
    name: string,
    type: SkillType,
    element: ElementType,
    effect: (target: Character, user: Character) => void,
    cost?: number
  ) {
    this.name = name;
    this.type = type;
    this.element = element;
    this.effect = effect;
    this.cost = cost;
  }
}
