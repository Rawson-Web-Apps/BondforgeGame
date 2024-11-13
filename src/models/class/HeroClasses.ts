import {
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
  OneHandedSword,
  TwoHandedSword,
  Dagger,
  Bow,
  Staff,
  Shield,
  Instrument,
} from "../Equipment";
import { CharacterClass } from "./CharacterClass";
import { ElementType } from "../skill/Skill";

// Tier 1 Classes
export class Warrior extends CharacterClass {
  name = "Warrior";
  allowedWeapons = [OneHandedSword, TwoHandedSword, Dagger];
  allowedArmor = [
    LeatherHelmet,
    ChainmailHelmet,
    PlateHelmet,
    LeatherChestplate,
    ChainmailChestplate,
    PlateChestplate,
    LeatherLeggings,
    ChainmailLeggings,
    PlateLeggings,
    LeatherBoots,
    ChainmailBoots,
    PlateBoots,
    Shield,
  ];
  skills = ["Slash", "Shield Block"];
  statBonuses = {
    strength: 2,
    dexterity: 1,
    constitution: 3,
    intelligence: 0,
    wisdom: 0,
    charisma: 1,
  };

  // Define strengths and weaknesses
  strengths = [ElementType.Physical];
  weaknesses = [ElementType.Fire];

  constructor() {
    super();
  }
}

export class Mage extends CharacterClass {
  name = "Mage";
  allowedWeapons = [Staff];
  allowedArmor = [ClothHelmet, ClothChestplate, ClothLeggings, ClothBoots];
  skills = ["Fireball", "Teleport"];
  statBonuses = {
    strength: 0,
    dexterity: 1,
    constitution: 1,
    intelligence: 3,
    wisdom: 2,
    charisma: 0,
  };

  // Define strengths and weaknesses
  strengths = [ElementType.Fire];
  weaknesses = [ElementType.Physical];

  constructor() {
    super();
  }
}

export class Rogue extends CharacterClass {
  name = "Rogue";
  allowedWeapons = [Dagger, OneHandedSword, Bow];
  allowedArmor = [
    LeatherHelmet,
    LeatherChestplate,
    LeatherLeggings,
    LeatherBoots,
  ];
  skills = ["Backstab", "Stealth"];
  statBonuses = {
    strength: 1,
    dexterity: 3,
    constitution: 1,
    intelligence: 1,
    wisdom: 0,
    charisma: 1,
  };

  // Define strengths and weaknesses
  strengths = [ElementType.Physical];
  weaknesses = [ElementType.Light];

  constructor() {
    super();
  }
}

export class Cleric extends CharacterClass {
  name = "Cleric";
  allowedWeapons = [Staff, OneHandedSword];
  allowedArmor = [
    ClothHelmet,
    LeatherHelmet,
    ClothChestplate,
    LeatherChestplate,
    ClothLeggings,
    LeatherLeggings,
    ClothBoots,
    LeatherBoots,
  ];
  skills = ["Heal", "Smite"];
  statBonuses = {
    strength: 1,
    dexterity: 0,
    constitution: 2,
    intelligence: 1,
    wisdom: 3,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

export class Ranger extends CharacterClass {
  name = "Ranger";
  allowedWeapons = [Bow, OneHandedSword, Dagger];
  allowedArmor = [
    LeatherHelmet,
    ChainmailHelmet,
    LeatherChestplate,
    ChainmailChestplate,
    LeatherLeggings,
    ChainmailLeggings,
    LeatherBoots,
    ChainmailBoots,
  ];
  skills = ["Arrow Shot", "Animal Companion"];
  statBonuses = {
    strength: 1,
    dexterity: 2,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

export class Bard extends CharacterClass {
  name = "Bard";
  allowedWeapons = [Instrument, OneHandedSword, Dagger];
  allowedArmor = [
    ClothHelmet,
    LeatherHelmet,
    ClothChestplate,
    LeatherChestplate,
    ClothLeggings,
    LeatherLeggings,
    ClothBoots,
    LeatherBoots,
  ];
  skills = ["Inspire", "Charm"];
  statBonuses = {
    strength: 0,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 0,
    charisma: 3,
  };

  constructor() {
    super();
  }
}

// Tier 2 Classes
export class Knight extends CharacterClass {
  name = "Knight";
  allowedWeapons = [OneHandedSword, TwoHandedSword, Dagger];
  allowedArmor = [
    LeatherHelmet,
    ChainmailHelmet,
    PlateHelmet,
    LeatherChestplate,
    ChainmailChestplate,
    PlateChestplate,
    LeatherLeggings,
    ChainmailLeggings,
    PlateLeggings,
    LeatherBoots,
    ChainmailBoots,
    PlateBoots,
    Shield,
  ];
  skills = ["Charge", "Shield Wall"];
  statBonuses = {
    strength: 2,
    dexterity: 1,
    constitution: 3,
    intelligence: 0,
    wisdom: 0,
    charisma: 1,
  };

  constructor() {
    super();
  }
}

export class Sorcerer extends CharacterClass {
  name = "Sorcerer";
  allowedWeapons = [Staff];
  allowedArmor = [ClothHelmet, ClothChestplate, ClothLeggings, ClothBoots];
  skills = ["Spell Blast", "Mana Shield"];
  statBonuses = {
    strength: 0,
    dexterity: 1,
    constitution: 1,
    intelligence: 3,
    wisdom: 2,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

// Tier 3 Classes
export class Paladin extends CharacterClass {
  name = "Paladin";
  allowedWeapons = [OneHandedSword, TwoHandedSword, Dagger];
  allowedArmor = [
    LeatherHelmet,
    ChainmailHelmet,
    PlateHelmet,
    LeatherChestplate,
    ChainmailChestplate,
    PlateChestplate,
    LeatherLeggings,
    ChainmailLeggings,
    PlateLeggings,
    LeatherBoots,
    ChainmailBoots,
    PlateBoots,
    Shield,
  ];
  skills = ["Holy Strike", "Divine Shield"];
  statBonuses = {
    strength: 2,
    dexterity: 1,
    constitution: 3,
    intelligence: 0,
    wisdom: 0,
    charisma: 1,
  };

  constructor() {
    super();
  }
}

export class Archmage extends CharacterClass {
  name = "Archmage";
  allowedWeapons = [Staff];
  allowedArmor = [ClothHelmet, ClothChestplate, ClothLeggings, ClothBoots];
  skills = ["Spell Blast", "Mana Shield"];
  statBonuses = {
    strength: 0,
    dexterity: 1,
    constitution: 1,
    intelligence: 3,
    wisdom: 2,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

// Tier 4 Classes
export class Champion extends CharacterClass {
  name = "Champion";
  allowedWeapons = [OneHandedSword, TwoHandedSword, Dagger];
  allowedArmor = [
    LeatherHelmet,
    ChainmailHelmet,
    PlateHelmet,
    LeatherChestplate,
    ChainmailChestplate,
    PlateChestplate,
    LeatherLeggings,
    ChainmailLeggings,
    PlateLeggings,
    LeatherBoots,
    ChainmailBoots,
    PlateBoots,
    Shield,
  ];
  skills = ["Slam", "Shield Wall"];
  statBonuses = {
    strength: 2,
    dexterity: 1,
    constitution: 3,
    intelligence: 0,
    wisdom: 0,
    charisma: 1,
  };

  constructor() {
    super();
  }
}

export class GrandSorcerer extends CharacterClass {
  name = "Grand Sorcerer";
  allowedWeapons = [Staff];
  allowedArmor = [ClothHelmet, ClothChestplate, ClothLeggings, ClothBoots];
  skills = ["Spell Blast", "Mana Shield"];
  statBonuses = {
    strength: 0,
    dexterity: 1,
    constitution: 1,
    intelligence: 3,
    wisdom: 2,
    charisma: 0,
  };

  constructor() {
    super();
  }
}
