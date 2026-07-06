import type { Plant } from "./plants.type";

export const findPlantOnTile = (selectedTileId: number, plants: Plant[]) => {
  const foundPlant = plants.find((plant) => plant.tileId === selectedTileId);

  if (foundPlant) {
    return true;
  } else {
    return false;
  }
};
