import type { Tile } from "../game/grid/tiles.types";
import drawAllTiles from "./drawAllTiles";


export default function drawScreenGrid(
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
) {
  drawAllTiles(tilePositions, ctx);
}
