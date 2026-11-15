export interface EnemyAttack {
  id: string;
  name: string;
  damage: number;
}

export type EnemyId = "nebroide";

export interface EnemyConfig {
  id: EnemyId;
  name: string;
  healthPoint: number;
  maxHealthPoint: number;
  attacks: EnemyAttack[];
}

export const enemyConfig: Record<EnemyId, EnemyConfig> = {
  nebroide: {
    id: "nebroide",
    name: "Nébroïdes",
    healthPoint: 100,
    maxHealthPoint: 100,
    attacks: [
      {
        id: "claw",
        name: "Griffure",
        damage: 4,
      },
      {
        id: "toxicCloud",
        name: "Nuage toxique",
        damage: 6,
      },
    ],
  },
};
