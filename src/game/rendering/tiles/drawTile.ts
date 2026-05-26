import type { Tile } from "../../type";

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
) => {

  ctx.fillStyle = tile.selected ? "#fb2ad8" : "#520445";
  ctx.fill(tile.path);

  ctx.strokeStyle = tile.selected ? "cyan" : "white";
  ctx.stroke(tile.path);
};
