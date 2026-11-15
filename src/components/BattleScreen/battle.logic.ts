import { enemyConfig, type EnemyId } from "./enemy/enemy.config";

export const selectEnemyAttack = () => {};

export const findEnemy = (enemyId: EnemyId) => {
  return enemyConfig[enemyId];
};
