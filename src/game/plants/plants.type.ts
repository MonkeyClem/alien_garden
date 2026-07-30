export const Species = {
  REACTOR_MUSHROOM :  "reactorMushroom",
  SYNAPTIC_VINE : "synapticVine",
  CRYSTAL_FLOWER : 'crystalFlower'
} as const

export type Species = (typeof Species)[keyof typeof Species]

export type Plant = {
  id: string;
  specie: Species;
  tileId: number;
  plantedAt: number;
  growth: number;
  isReadyToHarvest: boolean;
};

export type ResourceYield = {
  biomass?: number
  biologicalData? : number
  bioEnergy?: number
}

export type SpeciesStage = {
  label: string;
  description: string;
};

export type SpeciesConfig = {
  displayName: string;
  description: string;
  role: string;

  growthDuration: number;

  harvestable: boolean,
  harvestYield?: ResourceYield;

  stages: {
    1: SpeciesStage;
    2: SpeciesStage;
    3: SpeciesStage;
  };
};

