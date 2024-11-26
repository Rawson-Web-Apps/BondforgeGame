import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/ContextExport";
import { Warrior, Rogue, Cleric } from "../models/class/HeroClasses";
import {
  Dagger,
  Staff,
  Shield,
  Helmet,
  Leggings,
  ArmorType,
  Chestplate,
  Boots,
  OneHandedSword,
} from "../models/Equipment";
import Character from "../models/Character";
import "./MainMenu.css";
import { skills } from "../models/skill/Skills";

const MainMenu = () => {
  const navigate = useNavigate();
  const { setGameState } = useContext(GameContext)!;

  const party = [
    new Character({
      name: "Warrior",
      experience: 0,
      classType: new Warrior(),
      skills: [skills.slash],
      attack: 15,
      equipment: {
        mainHand: new OneHandedSword("Basic Sword", 10),
        offHand: new Shield("Basic Shield", 5),
        head: new Helmet("Leather Helmet", 2, ArmorType.Leather),
        chest: new Chestplate("Leather Chestplate", 5, ArmorType.Leather),
        legs: new Leggings("Leather Leggings", 3, ArmorType.Leather),
        boots: new Boots("Leather Boots", 2, ArmorType.Leather),
      },
    }),
    new Character({
      name: "Rogue",
      experience: 0,
      classType: new Rogue(),
      skills: [skills.backstab, skills.stealth],
      attack: 20,
      equipment: {
        mainHand: new Dagger("Basic Dagger", 8),
        offHand: new Dagger("Basic Dagger", 8),
        head: new Helmet("Leather Hood", 1, ArmorType.Leather),
        chest: new Chestplate("Leather Vest", 4, ArmorType.Leather),
        legs: new Leggings("Leather Pants", 2, ArmorType.Leather),
        boots: new Boots("Leather Shoes", 1, ArmorType.Leather),
      },
    }),
    new Character({
      name: "Cleric",
      experience: 0,
      classType: new Cleric(),
      skills: [skills.heal, skills.smite],
      attack: 10,
      equipment: {
        mainHand: new Staff("Basic Staff", 5),
        head: new Helmet("Cloth Cap", 1, ArmorType.Cloth),
        chest: new Chestplate("Cloth Robe", 3, ArmorType.Cloth),
        legs: new Leggings("Cloth Pants", 2, ArmorType.Cloth),
        boots: new Boots("Cloth Shoes", 1, ArmorType.Cloth),
      },
    }),
  ];

  const startNewGame = () => {
    setGameState({
      playerName: "Hero",
      party,
      location: "locations",
      enemies: [],
    });
    navigate("/bondforge/locations");
  };

  const about = () => {
    navigate("/bondforge/about");
  };

  const updates = () => {
    navigate("/bondforge/updates");
  };

  const guide = () => {
    navigate("/bondforge/guide");
  };

  return (
    <div className="main-menu">
      <button onClick={startNewGame}>New Game</button>
      <button onClick={about}>About</button>
      <button onClick={updates}>Updates</button>
      <button onClick={guide}>Guide</button>
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
    </div>
  );
};

export default MainMenu;
