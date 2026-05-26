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

export const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile) => {
  const tileColors = defineTileColors(tile);

  ctx.fillStyle = tileColors.fill;

  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);

  if (tile.selected === true && tile.hasSeed === true) {
    console.log("Une graine est déjà plantée ici ! :'(");
    return 
  }
  
  if (tile.selected === true && tile.hasSeed === false) {
    ctx.beginPath();
    ctx.moveTo(tile.x, tile.y);
    ctx.lineTo(tile.x, tile.y - 5);

    ctx.strokeStyle = "#0bdb7a";

    ctx.stroke();
    ctx.closePath();

    tile.hasSeed = true;
  }
};
