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
      console.log(
        `${user.name} casts Fireball on ${target.name} for ${damage} damage!`
      );
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
      console.log(`${user.name} heals ${target.name} for ${healing} HP!`);
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
      console.log(`${user.name} slashes ${target.name} for ${damage} damage!`);
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
      console.log(
        `${user.name} backstabs ${target.name} for ${damage} damage!`
      );
    },
    7 // Mana cost
  ),
  stealth: new Skill(
    "Stealth",
    SkillType.Buff,
    ElementType.Physical,
    (target: Character, user: Character) => {
      console.log(`${user.name} enters stealth mode on ${target.name}!`);
      // Implement stealth logic
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
      console.log(`${user.name} smites ${target.name} for ${damage} damage!`);
    },
    8 // Mana cost
  ),
  // Add more skills as needed
};
