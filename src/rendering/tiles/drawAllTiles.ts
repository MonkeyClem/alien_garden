import type { GameAssets } from "../../assets/assetTypes";
import type {  Tile } from "../../game/grid/tiles.types";
import { drawGroundOverlay } from "./drawGroundOverlay";
import { drawTexturedTile } from "./drawTexturedTile";

export default function drawAllTiles(
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets : GameAssets
) {
  return tilePositions.forEach((tile) => {
    drawTexturedTile(ctx, tile, assets)
    drawGroundOverlay(ctx, tile, assets)
  }
);
}


export const drawTileState = (
  ctx: CanvasRenderingContext2D,
  tiles: Tile[],
): void => {

  tiles.forEach(tile => {
      if (!tile.hovered && !tile.selected) return;
      console.log("tile status : selected")
        ctx.save();

  if (tile.selected) {
    ctx.strokeStyle = "#c86bff";
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = "#68e4ff";
    ctx.lineWidth = 0.5;
  }

  ctx.stroke(tile.path);

  ctx.restore();
  });


};