import type { GameAssets, Tile } from "../../type";
import { createTilePath } from "./createTilePath";
import drawAllTiles from "./drawAllTiles";

export const HALF_TILE_WIDTH = 30;
export const HALF_TILE_HEIGHT = 10;

export const GRID_WIDTH = 20;
export const GRID_HEIGHT = 20;

export const generateGrid = (canvasWidth: number): Tile[] => {
  const originX = canvasWidth / 2;
  const originY = 150;

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
        hasSeed: false,
        path: path,
      });
    }
  }

  return tilePositions;
};

export default function drawScreenGrid(
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets: GameAssets
) {
  drawAllTiles(tilePositions, ctx, assets);
}
