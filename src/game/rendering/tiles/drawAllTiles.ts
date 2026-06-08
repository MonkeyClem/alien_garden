import {  type GameAssets, type Tile } from "../../type";
import { drawTile } from "./drawTile";



export default function drawAllTiles(
  tilePositions: Tile[],
  ctx: CanvasRenderingContext2D,
  assets : GameAssets,
) {
  return tilePositions.forEach((tile) => drawTile(ctx, tile, assets));
}
