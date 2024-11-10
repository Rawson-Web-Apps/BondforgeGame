import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import { Warrior, Rogue, Cleric } from "../models/class/HeroClasses";
import {
  OneHandedSword,
  Dagger,
  Staff,
  LeatherHelmet,
  LeatherChestplate,
  LeatherLeggings,
  LeatherBoots,
  ClothHelmet,
  ClothChestplate,
  ClothLeggings,
  ClothBoots,
  Shield,
} from "../models/Equipment";
import Character from "../models/Character";

const MainMenu = () => {
  const navigate = useNavigate();
  const { setGameState } = useContext(GameContext)!;

  const startNewGame = () => {
    const party = [
      new Character({
        name: "Warrior",
        level: 1,
        experience: 0,
        classType: new Warrior(),
        skills: ["Slash", "Shield Block"],
        strength: 15,
        dexterity: 10,
        constitution: 14,
        intelligence: 8,
        wisdom: 8,
        charisma: 10,
        attack: 15,
        equipment: {
          mainHand: new OneHandedSword("Basic Sword", 10),
          offHand: new Shield("Basic Shield", 5),
          head: new LeatherHelmet("Leather Helmet", 2),
          chest: new LeatherChestplate("Leather Chestplate", 5),
          legs: new LeatherLeggings("Leather Leggings", 3),
          boots: new LeatherBoots("Leather Boots", 2),
        },
      }),
      new Character({
        name: "Rogue",
        level: 1,
        experience: 0,
        classType: new Rogue(),
        skills: ["Backstab", "Stealth"],
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
        attack: 20,
        equipment: {
          mainHand: new Dagger("Basic Dagger", 8),
          head: new LeatherHelmet("Leather Hood", 1),
          chest: new LeatherChestplate("Leather Vest", 4),
          legs: new LeatherLeggings("Leather Pants", 2),
          boots: new LeatherBoots("Leather Shoes", 1),
        },
      }),
      new Character({
        name: "Cleric",
        level: 1,
        experience: 0,
        classType: new Cleric(),
        skills: ["Heal", "Smite"],
        strength: 10,
        dexterity: 8,
        constitution: 12,
        intelligence: 10,
        wisdom: 15,
        charisma: 10,
        attack: 10,
        equipment: {
          mainHand: new Staff("Basic Staff", 5),
          head: new ClothHelmet("Cloth Cap", 1),
          chest: new ClothChestplate("Cloth Robe", 3),
          legs: new ClothLeggings("Cloth Pants", 2),
          boots: new ClothBoots("Cloth Shoes", 1),
        },
      }),
    ];

    setGameState({
      playerName: "Hero",
      party,
      location: "locations",
    });
    navigate("/locations");
  };

  // const loadGame = () => {
  //   // Logic for loading the game from localStorage (to be added)
  // };

  // const importSave = () => {
  //   // Logic for importing save files (to be added)
  // };

  return (
    <div className="main-menu">
      <h1>Retro RPG</h1>
      <button onClick={startNewGame}>New Game</button>
      {/* <button onClick={loadGame}>Load Game</button>
      <button onClick={importSave}>Import Save</button> */}
    </div>
  );
};

export default MainMenu;
