import type { Tile } from "../game/grid/tiles.types";
import { drawTile } from "./drawTile";



export default function drawAllTiles(
  tilePositions: Tile[],
  ctx: CanvasRenderingContext2D,
) {
  return tilePositions.forEach((tile) => drawTile(ctx, tile));
}
