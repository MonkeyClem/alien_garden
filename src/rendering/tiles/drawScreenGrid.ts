import type { GameAssets } from "../../assets/assetTypes";
import type { Tile } from "../../game/grid/tiles.types";
import drawAllTiles from "./drawAllTiles";

export default function drawScreenGrid(
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets: GameAssets,
) {
  drawAllTiles(ctx, tilePositions, assets);
}
