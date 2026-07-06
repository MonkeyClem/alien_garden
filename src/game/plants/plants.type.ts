export const Species = {
  REACTOR_MUSHROOM :  "reactorMushroom",
  SYNAPTIC_VINE : "synapticVine",
  CRYSTAL_FLOWER : 'crystalFlower'
} as const

export type Species = (typeof Species)[keyof typeof Species]

export type Plant = {
  id: ()=>`${string}-${string}-${string}-${string}-${string}`;
  species: Species;
  tileId: number;
  stage: 1 | 2 | 3;
  plantedAt: number;
  growth: number;
  isReadyToHarvest: boolean;
};
