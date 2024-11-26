export abstract class Equipment {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export type CharacterEquipment = {
  mainHand?: Weapon;
  offHand?: OffHandWeapon | Shield;
  head?: Helmet;
  chest?: Chestplate;
  legs?: Leggings;
  boots?: Boots;
};

// Base classes for Weapon and Armor
export abstract class Weapon extends Equipment {
  damage: number;
  type: WeaponType;

  constructor(name: string, damage: number, type: WeaponType) {
    super(name);
    this.damage = damage;
    this.type = type;
  }
}

export abstract class OneHandWeapon extends Weapon {
  hands: NumberOfHands;
  constructor(name: string, damage: number, type: WeaponType) {
    super(name, damage, type);
    this.hands = NumberOfHands.One;
  }
}

export abstract class TwoHandWeapon extends Weapon {
  hands: NumberOfHands;
  constructor(name: string, damage: number, type: WeaponType) {
    super(name, damage, type);
    this.hands = NumberOfHands.Two;
  }
}

export abstract class OffHandWeapon extends OneHandWeapon {
  hands: NumberOfHands;
  constructor(weapon: Weapon) {
    super(weapon.name, weapon.damage, weapon.type);
    this.hands = NumberOfHands.One;
  }
}

export abstract class Armor extends Equipment {
  defense: number;

  constructor(name: string, defense: number) {
    super(name);
    this.defense = defense;
  }
}

export enum WeaponType {
  Sword,
  Axe,
  Hammer,
  Club,
  Dagger,
  Bow,
  Staff,
  Instrument,
}

export enum NumberOfHands {
  One,
  Two,
}

export enum ArmorType {
  Cloth,
  Leather,
  Chainmail,
  Plate,
  Shield,
}

// Specific Armor Slots and Types
export class Helmet extends Armor {
  type?: ArmorType;
  constructor(name: string, defense: number, type?: ArmorType) {
    super(name, defense);
    this.type = type;
  }
}

export class Chestplate extends Armor {
  type?: ArmorType;
  constructor(name: string, defense: number, type?: ArmorType) {
    super(name, defense);
    this.type = type;
  }
}

export class Leggings extends Armor {
  type?: ArmorType;
  constructor(name: string, defense: number, type?: ArmorType) {
    super(name, defense);
    this.type = type;
  }
}

export class Boots extends Armor {
  type?: ArmorType;
  constructor(name: string, defense: number, type?: ArmorType) {
    super(name, defense);
    this.type = type;
  }
}

// Specific Weapon Types
export class OneHandedSword extends OneHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Sword);
  }
}

export class TwoHandedSword extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Sword);
  }
}

export class OneHandedAxe extends OneHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Axe);
  }
}

export class TwoHandedAxe extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Axe);
  }
}

export class OneHandedHammer extends OneHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Hammer);
  }
}

export class TwoHandedHammer extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Hammer);
  }
}

export class OneHandedClub extends OneHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Club);
  }
}

export class TwoHandedClub extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Club);
  }
}

export class Dagger extends OneHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Dagger);
  }
}

export class Bow extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Bow);
  }
}

export class Staff extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Staff);
  }
}

export class Instrument extends TwoHandWeapon {
  constructor(name: string, damage: number) {
    super(name, damage, WeaponType.Instrument);
  }
}

export class Shield extends Armor {
  hands: NumberOfHands;
  type: ArmorType;
  constructor(name: string, defense: number) {
    super(name, defense);
    this.hands = NumberOfHands.One;
    this.type = ArmorType.Shield;
  }
}

export const weapons = {
  Dagger: new Dagger("Dagger", 10),
  Sword: new OneHandedSword("Sword", 10),
  Axe: new OneHandedAxe("Axe", 10),
  Club: new OneHandedClub("Club", 10),
  Hammer: new TwoHandedHammer("Hammer", 10),
  Bow: new Bow("Bow", 10),
  Staff: new Staff("Staff", 10),
};

export const armor = {
  // Cloth
  ClothHelmet: new Helmet("Cloth Helmet", 2, ArmorType.Cloth),
  ClothChestplate: new Chestplate("Cloth Chestplate", 5, ArmorType.Cloth),
  ClothLeggings: new Leggings("Cloth Leggings", 5, ArmorType.Cloth),
  ClothBoots: new Boots("Cloth Boots", 4, ArmorType.Cloth),

  // Leather
  LeatherHelmet: new Helmet("Leather Helmet", 3, ArmorType.Leather),
  LeatherChestplate: new Chestplate("Leather Chestplate", 6, ArmorType.Leather),
  LeatherLeggings: new Leggings("Leather Leggings", 6, ArmorType.Leather),
  LeatherBoots: new Boots("Leather Boots", 5, ArmorType.Leather),

  // Chainmail
  ChainmailHelmet: new Helmet("Chainmail Helmet", 10, ArmorType.Chainmail),
  ChainmailChestplate: new Chestplate(
    "Chainmail Chestplate",
    15,
    ArmorType.Chainmail
  ),
  ChainmailLeggings: new Leggings(
    "Chainmail Leggings",
    15,
    ArmorType.Chainmail
  ),
  ChainmailBoots: new Boots("Chainmail Boots", 12, ArmorType.Chainmail),

  // Plate
  PlateHelmet: new Helmet("Plate Helmet", 20, ArmorType.Plate),
  PlateChestplate: new Chestplate("Plate Chestplate", 25, ArmorType.Plate),
  PlateLeggings: new Leggings("Plate Leggings", 25, ArmorType.Plate),
  PlateBoots: new Boots("Plate Boots", 20, ArmorType.Plate),

  // Shield
  Shield: new Shield("Shield", 10),
};
