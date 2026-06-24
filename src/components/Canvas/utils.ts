import type { Plant } from "../../game/type";

export const getPlantStage = (plant: Plant): 1 | 2 | 3 => {
  const elapseTime = (Date.now() - plant.plantedAt) / 1000;

  if (elapseTime >= 20) return 3;
  if (elapseTime >= 10) return 2;

  console.log("elapseTime : ", elapseTime);
  return 1;
};