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

// Define the GoblinClass
export class GoblinClass extends CharacterClass {
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
