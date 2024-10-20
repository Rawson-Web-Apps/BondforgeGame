// src/managers/SkillManager.ts
import { Skill, SkillType } from "../models/skill/Skill";
import { Character } from "../models/Character";

class SkillManager {
  static executeSkill(skill: Skill, user: Character, target: Character) {
    const cost = skill.cost ?? 0; // Default to 0 if cost is undefined

    if (user.mp >= cost) {
      user.mp -= cost;
      const targetInitialHp = target.currentHp;
      skill.effect(target, user);

      let resultMessage = `${user.name} used ${skill.name} on ${target.name}`;

      switch (skill.type) {
        case SkillType.Attack:
          const damage = targetInitialHp - target.currentHp;
          resultMessage += ` for ${damage} damage!`;
          break;
        case SkillType.Support:
          if (skill.name.toLowerCase().includes("heal")) {
            const healing = target.currentHp - targetInitialHp;
            resultMessage += ` and healed for ${healing} HP!`;
          } else {
            resultMessage += ` and applied a support effect!`;
          }
          break;
        case SkillType.Buff:
          resultMessage += ` and applied a buff effect!`;
          break;
        default:
          resultMessage += `!`;
      }

      return resultMessage;
    } else {
      return `${user.name} does not have enough MP to use ${skill.name}!`;
    }
  }
}

export default SkillManager;
