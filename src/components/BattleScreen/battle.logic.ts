import type { SetStateAction } from "react";
import type { BattleAbility, BattlePhase, BattleState, Fighter } from "../../App";
import { enemyConfig, type EnemyConfig, type EnemyId } from "./enemy/enemy.config";

export const selectEnemyAttack = () => {};

export const findEnemy = (enemyId: EnemyId) => {
  return enemyConfig[enemyId];
};

const handlePlayerTurn = () => {};

export const handleBattlePhase = (battlePhase: BattlePhase) => {
  if (battlePhase === "playerTurn") {
    handlePlayerTurn();
  }
};

export const handlePlayerAttack = (
  attack: BattleAbility,
  enemy: EnemyConfig,
  battlePhase: BattlePhase,
  setBattlePhase: React.Dispatch<SetStateAction<BattlePhase>>,
) => {
  if (battlePhase != "playerTurn") return;

  const damage = attack.damage;
  enemy.healthPoint -= damage;

  if (enemy.healthPoint > 0) {
    setBattlePhase("enemyTurn");
  }
  if (enemy.healthPoint <= 0) {
    setBattlePhase("victory");
  }
  return battlePhase;
};

export const launchBattle = (
  playerFighter: Fighter,
  enemyFighter: Fighter,
): BattleState => {
  const battle: BattleState = {
    player: playerFighter,
    enemy: enemyFighter,
    phase: "playerTurn",
  };
  return battle;
};
