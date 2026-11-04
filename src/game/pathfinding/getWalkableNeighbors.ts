import type { Tile } from "../grid/tiles.types";

export default function getWalkableNeighbors(
  gridX: number,
  gridY: number,
  tiles: Tile[],
  occupiedTileIds: Set<number>,
): Tile[] {
  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ];

  const walkableNeighbors: Tile[] = [];

  directions.forEach(direction => {
    const neighborX = gridX + direction.dx;
    const neighborY = gridY + direction.dy;

    const neighbor = tiles.find(
      tile => tile.gridX === neighborX && tile.gridY === neighborY,
    );

    if (!neighbor) return;

    if (occupiedTileIds.has(neighbor.id)) return;

    walkableNeighbors.push(neighbor);
  });

  return walkableNeighbors;
}
