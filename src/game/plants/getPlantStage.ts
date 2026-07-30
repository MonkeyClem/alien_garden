import type { Plant } from "./plants.type";
import { SPECIES_CONFIG } from "./speciesConfig";

export const getPlantGrowth = (plant : Plant, currentTime : number) => {
  const plantConfig = SPECIES_CONFIG[plant.specie]

  const elapsed = currentTime - plant.plantedAt

  return Math.min(
    elapsed / plantConfig.growthDuration, 
    1
  )
  }

export const getPlantStage = (plant: Plant): 1 | 2 | 3 => {
  const currentTime = Date.now();

  const growth = getPlantGrowth(plant, currentTime)

  if (growth < 0.33) {
    return 1;
  }

  if (growth < 0.66) {
    return 2;
  }

  return 3;
};