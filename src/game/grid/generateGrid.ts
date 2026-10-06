import { GRID_ORIGIN_X, GRID_ORIGIN_Y } from "../world/world.constant";
import { createTilePath } from "./createTilePath";
import { GRID_WIDTH, GRID_HEIGHT, HALF_TILE_WIDTH, HALF_TILE_HEIGHT } from "./grid.constants";
import type { GroundOverlay, GroundVariant, Tile } from "./tiles.types";


 export const getGroundVariant = (
  gridX: number,
  gridY: number,
): GroundVariant => {
  const hash =
    Math.imul(gridX, 73856093) ^
    Math.imul(gridY, 19349663);

  return Math.abs(hash) % 3 as GroundVariant;


};

export const getGroundOverlay = (gridX : number, gridY : number) : GroundOverlay => {
  const hash = Math.abs(gridX * 73856093 ^ gridY * 19349663)

    const value = hash % 20;

  if (value === 0) return "smallRock";
  if (value === 1) return "spores";
  if (value === 2) return "vein";

  return null;
}

export const generateGrid = (): Tile[] => {
  const originX = GRID_ORIGIN_X;
  const originY = GRID_ORIGIN_Y;

  const tilePositions: Tile[] = [];

  let tileId = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      tileId++;

      const gridX = i;
      const gridY = j;

      const worldX =
        originX + (gridX - gridY) * HALF_TILE_WIDTH;

      const worldY =
        originY + (gridX + gridY) * HALF_TILE_HEIGHT;
   
      const path = createTilePath(
        worldX,
        worldY,
        HALF_TILE_WIDTH,
        HALF_TILE_HEIGHT,
      );

      tilePositions.push({
        x: worldX,
        y: worldY,
        gridX,
        gridY,
        id: tileId,
        selected: false,
        hovered: false,
        path,
        groundVariant: getGroundVariant(gridX, gridY),
        groundOverlay: getGroundOverlay(gridX, gridY),
      });
    }
  }

  return tilePositions;
};