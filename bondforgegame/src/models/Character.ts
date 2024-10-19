import { CharacterClass } from "./CharacterClass";
import {
  Weapon,
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
  Shield,
} from "./Equipment";

export interface Character {
  name: string;
  level: number;
  experience: number;
  classType: CharacterClass;
  skills?: string[];
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  health: number;
  attack: number;
  equipment: {
    mainHand?: Weapon;
    offHand?: Weapon | Shield;
    head?: ClothHelmet | LeatherHelmet | ChainmailHelmet | PlateHelmet;
    chest?:
      | ClothChestplate
      | LeatherChestplate
      | ChainmailChestplate
      | PlateChestplate;
    legs?: ClothLeggings | LeatherLeggings | ChainmailLeggings | PlateLeggings;
    boots?: ClothBoots | LeatherBoots | ChainmailBoots | PlateBoots;
  };
}
