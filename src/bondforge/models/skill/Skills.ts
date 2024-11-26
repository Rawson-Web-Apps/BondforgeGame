// src/models/Skills.ts
import { Skill, SkillType, ElementType } from "./Skill";
import { Character } from "../Character"; // Ensure correct import

export const skills = {
  fireball: new Skill(
    "Fireball",
    SkillType.Attack,
    ElementType.Fire,
    (target: Character, user: Character) => {
      const damage = user.stats.intelligence * 2;
      target.updateCurrentHp(target.currentHp - damage);
      // Apply burn effect, if applicable
    },
    10 // Mana cost
  ),
  heal: new Skill(
    "Heal",
    SkillType.Support,
    ElementType.Light,
    (target: Character, user: Character) => {
      const healing = user.stats.intelligence * 2;
      target.updateCurrentHp(target.currentHp + healing);
    },
    5 // Mana cost
  ),
  slash: new Skill(
    "Slash",
    SkillType.Attack,
    ElementType.Physical,
    (target: Character, user: Character) => {
      const damage = user.stats.strength * 1.5;
      target.updateCurrentHp(target.currentHp - damage);
    },
    3 // Mana cost
  ),
  backstab: new Skill(
    "Backstab",
    SkillType.Attack,
    ElementType.Physical,
    (target: Character, user: Character) => {
      const damage = user.stats.strength * 2;
      target.updateCurrentHp(target.currentHp - damage);
    },
    7 // Mana cost
  ),
  stealth: new Skill(
    "Stealth",
    SkillType.Buff,
    ElementType.Physical,
    (target: Character, user: Character) => {
      // Implement stealth logic
      console.log("target: ", target, "user: ", user);
    }
    // No mana cost
  ),
  smite: new Skill(
    "Smite",
    SkillType.Attack,
    ElementType.Light,
    (target: Character, user: Character) => {
      const damage = user.stats.intelligence * 1.5;
      target.updateCurrentHp(target.currentHp - damage);
    },
    8 // Mana cost
  ),
  berserk: new Skill(
    "Berserk",
    SkillType.Buff,
    ElementType.Physical,
    (target: Character, user: Character) => {
      user.stats.strength += 1;
      console.log("target: ", target, "user: ", user);
    }
  ),
  sneakAttack: new Skill(
    "Sneak Attack",
    SkillType.Attack,
    ElementType.Physical,
    (target: Character, user: Character) => {
      target.updateCurrentHp(target.currentHp - user.stats.dexterity * 2);
    }
  ),
  // Add more skills as needed
};
