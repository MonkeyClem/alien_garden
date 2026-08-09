import type { Plant } from "./plants.type";

export const findPlantOnTile = (selectedTileId: number, plants: Plant[]) => {
  return plants.find((plant) => plant.tileId === selectedTileId);
};