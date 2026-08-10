import type { Building } from "./buildings.type";
import { getBuildingFootprint } from "./getBuildingFootprint";

 export const findBuildingOnTile = (selectedTileId: number, buildings: Building[]) => {
  return buildings.find((building) => {
    const occupiedTileIds = getBuildingFootprint(building)
    return occupiedTileIds.includes(selectedTileId)
  })
};
