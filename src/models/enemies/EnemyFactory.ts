import { enemyConfigs } from "./Enemies";
import Character from "../Character";

export const getRandomEnemy = (characterLevels: number[]): Character => {
  // Calculate average character level
  const avgLevel =
    characterLevels.reduce((acc, level) => acc + level, 0) /
    characterLevels.length;

  // Filter enemies within the level range
  const suitableEnemies = enemyConfigs.filter(
    (enemy) =>
      avgLevel >= enemy.levelRange[0] && avgLevel <= enemy.levelRange[1]
  );

  // If no enemies match, default to the lowest level enemy
  const selectedEnemyConfig =
    suitableEnemies.length > 0
      ? suitableEnemies[Math.floor(Math.random() * suitableEnemies.length)]
      : enemyConfigs[0];

  // Create and return a new Character instance based on the config
  return new Character({
    name: selectedEnemyConfig.name,
    level:
      Math.floor(
        Math.random() *
          (selectedEnemyConfig.levelRange[1] -
            selectedEnemyConfig.levelRange[0] +
            1)
      ) + selectedEnemyConfig.levelRange[0],
    experience: 0,
    classType: selectedEnemyConfig.classType,
    skills: selectedEnemyConfig.skills,
    stats: selectedEnemyConfig.stats,
    attack: selectedEnemyConfig.attack,
    equipment: selectedEnemyConfig.equipment,
  });
};
