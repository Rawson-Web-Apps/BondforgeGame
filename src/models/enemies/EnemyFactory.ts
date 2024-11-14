import { enemyConfigs, EnemyConfig } from "./Enemies";
import Character from "../Character";

/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum number
 * @param max - Maximum number
 * @returns Random integer between min and max
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Creates a new enemy instance based on the provided configuration.
 * @param config - Enemy configuration
 * @param characterLevels - Array of party member levels
 * @returns A new Character instance representing the enemy
 */
const createEnemy = (
  config: EnemyConfig,
  characterLevels: number[]
): Character => {
  const avgLevel =
    characterLevels.reduce((acc, level) => acc + level, 0) /
    characterLevels.length;

  // Determine enemy level based on average character level
  const enemyLevel = Math.min(
    Math.max(Math.floor(avgLevel * 0.8), config.levelRange[0]),
    config.levelRange[1]
  );

  // Scale stats based on level
  const scaleFactor = enemyLevel / config.levelRange[0];
  const scaledStats = {
    strength: Math.floor(config.stats.strength * scaleFactor),
    dexterity: Math.floor(config.stats.dexterity * scaleFactor),
    constitution: Math.floor(config.stats.constitution * scaleFactor),
    intelligence: Math.floor(config.stats.intelligence * scaleFactor),
    wisdom: Math.floor(config.stats.wisdom * scaleFactor),
    charisma: Math.floor(config.stats.charisma * scaleFactor),
  };

  return new Character({
    name: config.name,
    level: enemyLevel,
    experience: 0,
    classType: config.classType,
    skills: config.skills,
    stats: scaledStats,
    attack: Math.floor(config.attack * scaleFactor),
    equipment: config.equipment,
  });
};

/**
 * Generates a random list of enemies (1-5) based on party levels.
 * @param characterLevels - Array of party member levels
 * @returns Array of Character instances representing the enemies
 */
export const getRandomEnemies = (characterLevels: number[]): Character[] => {
  const numberOfEnemies = getRandomInt(1, 5);
  const enemies: Character[] = [];

  for (let i = 0; i < numberOfEnemies; i++) {
    // Select a random enemy configuration suitable for the party level
    const suitableEnemies = enemyConfigs.filter(
      (enemy) =>
        characterLevels.reduce((acc, level) => acc + level, 0) /
          characterLevels.length >=
          enemy.levelRange[0] &&
        characterLevels.reduce((acc, level) => acc + level, 0) /
          characterLevels.length <=
          enemy.levelRange[1]
    );

    // If no suitable enemies, default to the first enemy
    const selectedEnemyConfig =
      suitableEnemies.length > 0
        ? suitableEnemies[getRandomInt(0, suitableEnemies.length - 1)]
        : enemyConfigs[0];

    const enemy = createEnemy(selectedEnemyConfig, characterLevels);
    enemies.push(enemy);
  }

  return enemies;
};
