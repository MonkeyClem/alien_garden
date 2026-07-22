import type { GameAssets } from "../assets/assetTypes";
import type { Tile } from "../game/grid/tiles.types";

const defineTileColors = (tile: Tile) => {
  if (tile.selected) {
    return {
      fill: "#6d4ac9",
      stroke: "#9f7aea",
    };
  }

  if (tile.hovered) {
    return {
      fill: "#3b2359",
      stroke: "#1f3d63",
    };
  }

  return {
    fill: "#230127",
    stroke: "rgba(120, 220, 255, 0.12)",
  };
};


export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets : GameAssets
) => {
  const tileColors = defineTileColors(tile);

  const pattern = ctx.createPattern(assets.alienGround, "")

  if(!pattern) return 
    // ctx.fillStyle = tileColors.fill;

  ctx.fillStyle = pattern;

  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);
};
