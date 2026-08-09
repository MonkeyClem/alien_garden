import type { Building } from "../buildings/buildings.type";
import { BUILDING_CONFIG } from "../buildings/buildingsConfig";
import { GRID_WIDTH } from "../grid/grid.constants";
import type { Decoration } from "./decoration.type";
import { getOccupiedTileIds } from "./getOccupiedTilesIds";

export const findDecorationOnTile = (
  selectedTileId: number,
  decorations: Decoration[]
): Decoration | undefined => {
  return decorations.find((decoration) => {
    const occupiedTileIds = getOccupiedTileIds(decoration);
    return occupiedTileIds.includes(selectedTileId);
  });
};


 export const findBuildingOnTile = (selectedTileId: number, buildings: Building[]) => {
  // const foundBuilding =  buildings.find((building) => building.tileId === selectedTileId);
  return buildings.find((building) => {
    const occupiedTileIds = getBuildingFootprint(building)
    return occupiedTileIds.includes(selectedTileId)
  })
  // if(!foundBuilding) return 
  // const occupiedTileIds = getBuildingFootprint(foundBuilding)
  // // return occupiedTileIds.includes(selectedTileId)
  // return foundBuilding
};


export const getBuildingFootprint = (
  building : Building
) => {
    const occupiedTileIds: number[] = [];

    const originTileId = building.tileId

    const footPrint = BUILDING_CONFIG[building.type].footPrint

    for (let row = 0; row < footPrint.height; row++) {
      for (let col = 0; col < footPrint.width; col++) {
        const occupiedTileId = originTileId + col + row * GRID_WIDTH;
        occupiedTileIds.push(occupiedTileId);
      }
  }

  return occupiedTileIds;

  }