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


export const generateGrid = (canvasWidth: number): Tile[] => {
  const originX = canvasWidth / 2;
  const originY = 195;

  const tilePositions: Tile[] = [];

  let tileId = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      tileId = tileId + 1;
      const gridX = i;
      const gridY = j;
      const screenX = originX + (gridX - gridY) * HALF_TILE_WIDTH;
      const screenY = originY + (gridX + gridY) * HALF_TILE_HEIGHT;
      const path = createTilePath(
        screenX,
        screenY,
        HALF_TILE_WIDTH,
        HALF_TILE_HEIGHT,
      );
      tilePositions.push({
        x: screenX,
        y: screenY,
        gridX: gridX,
        gridY: gridY,
        id: tileId,
        selected: false,
        hovered: false,
        path: path,

        groundVariant: getGroundVariant(gridX, gridY),
        groundOverlay: getGroundOverlay(gridX, gridY)
      });
    }
  }

  return tilePositions;
};
