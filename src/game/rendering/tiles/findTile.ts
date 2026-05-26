import type { Tile } from "../../type";
// import { HALF_TILE_WIDTH, HALF_TILE_HEIGHT } from "./drawScreenGrid";

export default function findTile(
  tilePositions: Tile[],
  clickedPos: { x: number; y: number },
  ctx: CanvasRenderingContext2D,
) {
  const xPosToFind = clickedPos.x;
  const yPosToFind = clickedPos.y;

  // for (let i = 0; i < tilePositions.length; i++) {
  //   if (
  //     xPosToFind > tilePositions[i].x - HALF_TILE_WIDTH &&
  //     xPosToFind < tilePositions[i].x + HALF_TILE_WIDTH &&
  //     yPosToFind > tilePositions[i].y - HALF_TILE_HEIGHT &&
  //     yPosToFind < tilePositions[i].y + HALF_TILE_HEIGHT
  //   ) {
  //     return tilePositions[i].id;
  //   }
  // }

  let selectedTile: Tile | null = null;

  tilePositions.forEach((tile) => {
    const isSelected: boolean = ctx.isPointInPath(
      tile.path,
      xPosToFind,
      yPosToFind,
    );
    if (isSelected) selectedTile = tile;
  });

  return selectedTile?.id;
}
