import {
  // ClothHelmet,
  LeatherHelmet,
  ChainmailHelmet,
  PlateHelmet,
  // ClothChestplate,
  LeatherChestplate,
  ChainmailChestplate,
  PlateChestplate,
  // ClothLeggings,
  LeatherLeggings,
  ChainmailLeggings,
  PlateLeggings,
  // ClothBoots,
  LeatherBoots,
  ChainmailBoots,
  PlateBoots,
  // OneHandedSword,
  // TwoHandedSword,
  Dagger,
  Club,
  Hammer,
  // Bow,
  // Staff,
  // Shield,
  // Instrument,
} from "../Equipment";
import { CharacterClass } from "./CharacterClass";

export class GoblinClass extends CharacterClass {
  name = "Goblin";
  allowedWeapons = [Dagger];
  allowedArmor = [
    LeatherHelmet,
    LeatherChestplate,
    LeatherLeggings,
    LeatherBoots,
  ];
  skills = ["Sneak Attack"];
  statBonuses = {
    strength: 1,
    dexterity: 2,
    constitution: 1,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

export class OrcClass extends CharacterClass {
  name = "Orc";
  allowedWeapons = [Club];
  allowedArmor = [
    ChainmailHelmet,
    ChainmailChestplate,
    ChainmailLeggings,
    ChainmailBoots,
  ];
  skills = ["Sneak Attack"];
  statBonuses = {
    strength: 2,
    dexterity: 1,
    constitution: 3,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  constructor() {
    super();
  }
}

export class TrollClass extends CharacterClass {
  name = "Troll";
  allowedWeapons = [Hammer];
  allowedArmor = [PlateHelmet, PlateChestplate, PlateLeggings, PlateBoots];
  skills = ["Sneak Attack"];
  statBonuses = {
    strength: 8,
    dexterity: 1,
    constitution: 8,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  constructor() {
    super();
  }
}
