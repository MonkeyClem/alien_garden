
import { GRID_WIDTH } from "../grid/grid.constants";
import type { Decoration } from "./decoration.type";

export const getOccupiedTileIds = (
  decoration: Decoration
): number[] => {
  const occupiedTileIds: number[] = [];

  const originTileId = decoration.tileId;
  const footPrint = decoration.footPrint;

  for (let row = 0; row < footPrint.height; row++) {
    for (let col = 0; col < footPrint.width; col++) {
      const occupiedTileId =
        originTileId + col + row * GRID_WIDTH;

      occupiedTileIds.push(occupiedTileId);
    }
  }

  return occupiedTileIds;
};

