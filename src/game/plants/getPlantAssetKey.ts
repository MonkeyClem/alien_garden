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

  throw new Error(
    `No assets key available for species ${plant.specie}`,
  );
};