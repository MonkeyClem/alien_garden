import type { AssetsKey } from "../../assets/assetTypes";
import type { Plant } from "./plants.type";

export const getPlantAssetKey = (plant: Plant, stage: number): AssetsKey => {
  if (plant.specie === "reactorMushroom") {
    if (stage === 1) {
      return "reactorMushroomStageOne";
    }
    if (stage === 2) {
      return "reactorMushroomStageTwo";
    }
    return "reactorMushroomStageThree";
  }

  if (plant.specie === "synapticVine") {
    if(stage === 1)
      return "synapticVineStageOne"
  
    if(stage === 2)
      return "synapticVineStageTwo"
  
      if(stage === 3)
      return "synapticVineStageTwo"
  }
  
  throw new Error(
    `No assets key available for species ${plant.specie}`,
  );
};