import type { Tile } from "../../type";

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
    fill: "#36163a",
    stroke: "rgba(120, 220, 255, 0.12)",
  };
};

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
) => {


    const tileColors = defineTileColors(tile)


    ctx.fillStyle = tileColors.fill
//   ctx.fillStyle = tile.selected ? "#fb2ad8" : "#520445";
//   ctx.fillStyle = tile.hovered ? "#efcae9" : "#520445";
    ctx.fill(tile.path);

//   ctx.strokeStyle = tile.selected ? "cyan" : "white";
ctx.strokeStyle= tileColors.stroke
  ctx.stroke(tile.path);
};
