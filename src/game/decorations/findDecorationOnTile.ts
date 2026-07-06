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
