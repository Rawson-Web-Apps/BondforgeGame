export abstract class Equipment {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Base classes for Weapon and Armor
export abstract class Weapon extends Equipment {
  damage: number;

  constructor(name: string, damage: number) {
    super(name);
    this.damage = damage;
  }
}

export abstract class Armor extends Equipment {
  defense: number;

  constructor(name: string, defense: number) {
    super(name);
    this.defense = defense;
  }
}

// Specific Armor Slots and Types
export class ClothHelmet extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class LeatherHelmet extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ChainmailHelmet extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class PlateHelmet extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ClothChestplate extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class LeatherChestplate extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ChainmailChestplate extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class PlateChestplate extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ClothLeggings extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class LeatherLeggings extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ChainmailLeggings extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class PlateLeggings extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ClothBoots extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class LeatherBoots extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class ChainmailBoots extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class PlateBoots extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

// Specific Weapon Types
export class OneHandedSword extends Weapon {
  constructor(name: string, damage: number) {
    super(name, damage);
  }
}

export class TwoHandedSword extends Weapon {
  constructor(name: string, damage: number) {
    super(name, damage);
  }
}

export class Dagger extends Weapon {
  constructor(name: string, damage: number) {
    super(name, damage);
  }
}

export class Bow extends Weapon {
  constructor(name: string, damage: number) {
    super(name, damage);
  }
}

export class Staff extends Weapon {
  magicDamage: number;

  constructor(name: string, magicDamage: number) {
    super(name, 0); // Assuming no physical damage
    this.magicDamage = magicDamage;
  }
}

export class Shield extends Armor {
  constructor(name: string, defense: number) {
    super(name, defense);
  }
}

export class Instrument extends Weapon {
  charismaBoost: number;

  constructor(name: string, charismaBoost: number) {
    super(name, 0); // Assuming no physical damage
    this.charismaBoost = charismaBoost;
  }
}
