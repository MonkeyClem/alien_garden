import { getPlantGrowth } from "./getPlantGrowth";
import type { Plant } from "./plants.type";


export const getPlantStage = (plant: Plant): 1 | 2 | 3 => {
  const currentTime = Date.now();

  const growth = getPlantGrowth(plant, currentTime)

  if (growth < 0.33) {
    return 1;
  }

  if (growth < 0.66) {
    return 2;
  }

  plant.isReadyToHarvest = true
  return 3;
};