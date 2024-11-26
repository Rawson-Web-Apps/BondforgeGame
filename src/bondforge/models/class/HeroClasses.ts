import { WeaponType, ArmorType } from "../Equipment";
import { SpecializationClass } from "./SpecializationClass";
import { ElementType } from "../skill/Skill";
import { skills } from "../skill/Skills";

// Tier 1 Classes
export class Warrior extends SpecializationClass {
  constructor() {
    super({
      name: "Warrior",
      allowedWeapons: [
        WeaponType.Sword,
        WeaponType.Axe,
        WeaponType.Hammer,
        WeaponType.Club,
      ],
      allowedArmor: [
        ArmorType.Cloth,
        ArmorType.Leather,
        ArmorType.Chainmail,
        ArmorType.Plate,
        ArmorType.Shield,
      ],
      skills: [skills.slash],
      stats: {
        strength: 15,
        dexterity: 10,
        constitution: 14,
        intelligence: 8,
        wisdom: 8,
        charisma: 10,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class Mage extends SpecializationClass {
  constructor() {
    super({
      name: "Mage",
      allowedWeapons: [WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth],
      skills: [skills.fireball],
      stats: {
        strength: 8,
        dexterity: 8,
        constitution: 10,
        intelligence: 15,
        wisdom: 12,
        charisma: 10,
      },
      strengths: [ElementType.Fire],
      weaknesses: [ElementType.Physical],
    });
  }
}

export class Rogue extends SpecializationClass {
  constructor() {
    super({
      name: "Rogue",
      allowedWeapons: [WeaponType.Dagger],
      allowedArmor: [ArmorType.Cloth, ArmorType.Leather],
      skills: [skills.backstab, skills.stealth],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
      // Define strengths and weaknesses
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Light],
    });
  }
}

export class Cleric extends SpecializationClass {
  constructor() {
    super({
      name: "Cleric",
      allowedWeapons: [WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth],
      skills: [skills.heal, skills.smite],
      stats: {
        strength: 10,
        dexterity: 8,
        constitution: 12,
        intelligence: 10,
        wisdom: 15,
        charisma: 10,
      },
      strengths: [ElementType.Light],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class Ranger extends SpecializationClass {
  constructor() {
    super({
      name: "Ranger",
      allowedWeapons: [WeaponType.Bow, WeaponType.Dagger],
      allowedArmor: [ArmorType.Cloth, ArmorType.Leather],
      skills: [],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Light],
    });
  }
}

export class Bard extends SpecializationClass {
  constructor() {
    super({
      name: "Bard",
      allowedWeapons: [WeaponType.Instrument, WeaponType.Dagger],
      allowedArmor: [ArmorType.Cloth, ArmorType.Leather],
      skills: [],
      stats: {
        strength: 8,
        dexterity: 8,
        constitution: 10,
        intelligence: 15,
        wisdom: 12,
        charisma: 10,
      },
      strengths: [ElementType.Light],
      weaknesses: [ElementType.Fire],
    });
  }
}

// Tier 2 Classes
export class Knight extends SpecializationClass {
  constructor() {
    super({
      name: "Knight",
      allowedWeapons: [WeaponType.Dagger],
      allowedArmor: [
        ArmorType.Cloth,
        ArmorType.Leather,
        ArmorType.Chainmail,
        ArmorType.Plate,
        ArmorType.Shield,
      ],
      skills: [],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class Sorcerer extends SpecializationClass {
  constructor() {
    super({
      name: "Sorcerer",
      allowedWeapons: [WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth],
      skills: [],
      stats: {
        strength: 8,
        dexterity: 8,
        constitution: 10,
        intelligence: 15,
        wisdom: 12,
        charisma: 10,
      },
      strengths: [ElementType.Fire],
      weaknesses: [ElementType.Physical],
    });
  }
}

// Tier 3 Classes
export class Paladin extends SpecializationClass {
  constructor() {
    super({
      name: "Paladin",
      allowedWeapons: [WeaponType.Dagger],
      allowedArmor: [
        ArmorType.Cloth,
        ArmorType.Leather,
        ArmorType.Chainmail,
        ArmorType.Plate,
        ArmorType.Shield,
      ],
      skills: [],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class Archmage extends SpecializationClass {
  constructor() {
    super({
      name: "Archmage",
      allowedWeapons: [WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth],
      skills: [],
      stats: {
        strength: 8,
        dexterity: 8,
        constitution: 10,
        intelligence: 15,
        wisdom: 12,
        charisma: 10,
      },
      strengths: [ElementType.Fire],
      weaknesses: [ElementType.Physical],
    });
  }
}

// Tier 4 Classes
export class Champion extends SpecializationClass {
  name = "Champion";
  constructor() {
    super({
      name: "Champion",
      allowedWeapons: [WeaponType.Dagger],
      allowedArmor: [
        ArmorType.Cloth,
        ArmorType.Leather,
        ArmorType.Chainmail,
        ArmorType.Plate,
        ArmorType.Shield,
      ],
      skills: [],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
      strengths: [ElementType.Physical],
      weaknesses: [ElementType.Fire],
    });
  }
}

export class GrandSorcerer extends SpecializationClass {
  constructor() {
    super({
      name: "Grand Sorcerer",
      allowedWeapons: [WeaponType.Staff],
      allowedArmor: [ArmorType.Cloth],
      skills: [],
      stats: {
        strength: 8,
        dexterity: 8,
        constitution: 10,
        intelligence: 15,
        wisdom: 12,
        charisma: 10,
      },
      strengths: [ElementType.Fire],
      weaknesses: [ElementType.Physical],
    });
  }
}
