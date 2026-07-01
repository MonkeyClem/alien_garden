
import { GRID_WIDTH } from "../rendering/tiles/drawScreenGrid";
import type { Decoration } from "../type";

export const getOccupiedTileIds = (
  decoration: Decoration
): number[] => {
  const occupiedTileIds: number[] = [];

  const originTileId = decoration.tileId;
  const footprint = decoration.footPrint;

  for (let row = 0; row < footprint.height; row++) {
    for (let col = 0; col < footprint.width; col++) {
      const occupiedTileId =
        originTileId + col + row * GRID_WIDTH;

      occupiedTileIds.push(occupiedTileId);
    }
  }

  return occupiedTileIds;
};




export const findDecorationOnTile = (
  selectedTileId: number,
  decorations: Decoration[]
): Decoration | undefined => {
  return decorations.find((decoration) => {
    const occupiedTileIds = getOccupiedTileIds(decoration);
    return occupiedTileIds.includes(selectedTileId);
  });
};
