import { getAdjacentTiles } from "../grid/getAdjacentTiles";
import type { Tile } from "../grid/tiles.types";
import type { Plant } from "./plants.type";

export const getAdjacentPlants = (
  plant: Plant,
  plants: Plant[],
  tiles: Tile[],
): Plant[] => {
  const plantTile = tiles.find(
    (tile) => tile.id === plant.tileId,
  );

  if (!plantTile) return [];

  const adjacentTiles = getAdjacentTiles(
    plantTile,
    tiles,
  );

  const adjacentTileIds = new Set(
    adjacentTiles.map((tile) => tile.id),
  );

  return plants.filter((candidate) =>
    adjacentTileIds.has(candidate.tileId),
  );
};