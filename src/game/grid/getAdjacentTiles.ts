import type { Tile } from "./tiles.types";

export const getAdjacentTiles = (
  tile: Tile,
  tiles: Tile[],
): Tile[] => {
  return tiles.filter((candidate) => {
    const deltaX = Math.abs(candidate.gridX - tile.gridX);
    const deltaY = Math.abs(candidate.gridY - tile.gridY);

    return deltaX + deltaY === 1;
  });
};