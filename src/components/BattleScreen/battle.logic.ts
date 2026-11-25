import type { BattleAbility, BattlePhase, BattleState, Fighter } from "../../App";
import { enemyConfig, type EnemyId } from "./enemy/enemy.config";

export const findEnemy = (enemyId: EnemyId) => {
  return enemyConfig[enemyId];
};

export function shouldBattleContinue(battle: BattleState) {
  return Boolean(battle.enemy.healthPoint > 0 && battle.player.healthPoint > 0);
}
export function launchBattle(player: Fighter, enemy: Fighter): BattleState {
  const battle: BattleState = {
    player: player,
    enemy: enemy,
    phase: "playerTurn",
  };
  console.log("LA BATAILLE EST LANCEE " + JSON.stringify(battle));
  return battle;
}

export function enemyRound(battle: BattleState) {
  const enemy = findEnemy(battle.enemy.id as EnemyId);
  const enemyAttackDamage = enemy.attacks[0].damage;

  const newPlayerHP = battle.player.healthPoint - enemyAttackDamage;

  const newPlayer = {
    ...battle.player,
    healthPoint: newPlayerHP,
  };
  const newBattle: BattleState = {
    ...battle,
    phase: "playerTurn",
    player: newPlayer,
  };
  return newBattle;
}

export function playerRound(
  playerAttack: BattleAbility,
  battle: BattleState,
): BattleState {
  const damage = playerAttack.damage;

  const newEnemyHP = battle.enemy.healthPoint - damage;

  const newEnemy = {
    ...battle.enemy,
    healthPoint: newEnemyHP,
  };
  const updatedBattle = {
    ...battle,
    enemy: newEnemy,
  };

  if (shouldBattleContinue(updatedBattle)) {
    let newBattle = {
      ...updatedBattle,
      phase: "enemyTurn" as BattlePhase,
    };
    newBattle = enemyRound(newBattle);
    if (newBattle.player.healthPoint > 0) {
      return newBattle;
    } else {
      window.alert("Le combat est terminé");
      return newBattle;
    }
  } else {
    return battle;
  }
}
