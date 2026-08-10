import { GRID_WIDTH } from "../grid/grid.constants";
import type { Building } from "./buildings.type";
import { BUILDING_CONFIG } from "./buildingsConfig";

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