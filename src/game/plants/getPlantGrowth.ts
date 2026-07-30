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
