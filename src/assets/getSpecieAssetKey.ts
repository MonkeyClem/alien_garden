import type { Species } from "../game/plants/plants.type";
import type { AssetsKey } from "./assetTypes";

export const getSpecieAssetKey = (specie: Species): AssetsKey => {
  if (specie === "reactorMushroom") {
    return "reactorMushroomStageThree";
  }

  if (specie === "synapticVine") {
    return "synapticVineStageTwo";
  }

  if (specie === "crystalFlower") {
    return "synapticVineStageTwo";
  }
  throw new Error(
    `No assets key available for the specie ${specie} to be display in inventory`,
  );
};