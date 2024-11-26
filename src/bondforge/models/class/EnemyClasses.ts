import { ArmorType, WeaponType } from "../Equipment";
import { ElementType } from "../skill/Skill";
import { skills } from "../skill/Skills";
import { SpecializationClass } from "./SpecializationClass";

export class GoblinClass extends SpecializationClass {
  constructor() {
    super({
      name: "Goblin",
      allowedWeapons: [WeaponType.Dagger, WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth, ArmorType.Leather],
      skills: [skills.sneakAttack],
      stats: {
        strength: 8,
        dexterity: 12,
        constitution: 10,
        intelligence: 6,
        wisdom: 6,
        charisma: 5,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class OrcClass extends SpecializationClass {
  constructor() {
    super({
      name: "Orc",
      allowedWeapons: [WeaponType.Club],
      allowedArmor: [ArmorType.Cloth, ArmorType.Leather, ArmorType.Chainmail],
      skills: [skills.sneakAttack],
      stats: {
        strength: 14,
        dexterity: 10,
        constitution: 12,
        intelligence: 5,
        wisdom: 5,
        charisma: 6,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class TrollClass extends SpecializationClass {
  constructor() {
    super({
      name: "Troll",
      allowedWeapons: [WeaponType.Hammer],
      allowedArmor: [
        ArmorType.Cloth,
        ArmorType.Leather,
        ArmorType.Chainmail,
        ArmorType.Plate,
      ],
      skills: [skills.sneakAttack],
      stats: {
        strength: 18,
        dexterity: 8,
        constitution: 16,
        intelligence: 4,
        wisdom: 4,
        charisma: 3,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}
