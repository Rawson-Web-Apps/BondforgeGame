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
import "./MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate();
  const { setGameState } = useContext(GameContext)!;

  const party = [
    new Character({
      name: "Warrior",
      experience: 0,
      classType: new Warrior(),
      skills: ["Slash"],
      stats: {
        strength: 15,
        dexterity: 10,
        constitution: 14,
        intelligence: 8,
        wisdom: 8,
        charisma: 10,
      },
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
      experience: 0,
      classType: new Rogue(),
      skills: ["Backstab", "Stealth"],
      stats: {
        strength: 10,
        dexterity: 15,
        constitution: 10,
        intelligence: 10,
        wisdom: 8,
        charisma: 12,
      },
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
      experience: 0,
      classType: new Cleric(),
      skills: ["Heal", "Smite"],
      stats: {
        strength: 10,
        dexterity: 8,
        constitution: 12,
        intelligence: 10,
        wisdom: 15,
        charisma: 10,
      },
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

  const startNewGame = () => {
    setGameState({
      playerName: "Hero",
      party,
      location: "locations",
    });
    navigate("/locations");
  };

  return (
    <div className="main-menu">
      <h1>Bondforge RPG</h1>
      <section className="introduction">
        <p>
          In a world on the brink of chaos, four heroes rise to the challenge.
          Meet the Warrior, Rogue, and Cleric, each with unique skills and
          strengths. Your mission is to guide them through perilous quests,
          level up their abilities, and prepare for the ultimate battle against
          the dark forces threatening the realm. Forge bonds, gather resources,
          and become the hero the world needs.
        </p>
      </section>
      <section className="character-overview">
        {party.map((character, index) => (
          <div key={index} className="character-card">
            <h2>{character.name}</h2>
            <img
              src={`/images/${character.name.toLowerCase()}.png`}
              alt={`${character.name} class`}
              className="character-image"
            />
            <p>Class: {character.classType.name}</p>
            <p>Level: {character.level}</p>
            <p>Experience: {character.experience}</p>
            <h3>Stats</h3>
            <ul>
              <li>Strength: {character.stats.strength}</li>
              <li>Dexterity: {character.stats.dexterity}</li>
              <li>Constitution: {character.stats.constitution}</li>
              <li>Intelligence: {character.stats.intelligence}</li>
              <li>Wisdom: {character.stats.wisdom}</li>
              <li>Charisma: {character.stats.charisma}</li>
            </ul>
            <h3>Equipment</h3>
            <ul>
              <li>Main Hand: {character.equipment.mainHand?.name}</li>
              {character.equipment.offHand && (
                <li>Off Hand: {character.equipment.offHand?.name}</li>
              )}
              <li>Head: {character.equipment.head?.name}</li>
              <li>Chest: {character.equipment.chest?.name}</li>
              <li>Legs: {character.equipment.legs?.name}</li>
              <li>Boots: {character.equipment.boots?.name}</li>
            </ul>
          </div>
        ))}
      </section>
      <button onClick={startNewGame}>New Game</button>
    </div>
  );
};

export default MainMenu;
