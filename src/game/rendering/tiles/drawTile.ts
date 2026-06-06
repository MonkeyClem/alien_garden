import type { Tile } from "../../type";
import type { seedsType } from '../../type';


const defineSeedColors = (seedsType : seedsType) =>  { 
    if(!seedsType) return

    if(seedsType === "blue") return {
      stroke: "#8cdaf2",
    };

    if(seedsType === "green") return {
      stroke: "#0bdb7a",
    };

    if(seedsType === "red") return {
        stroke : "#b31010",
    }
}



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




export const drawSeed = (ctx : CanvasRenderingContext2D, tile : Tile) => {
  if (tile.hasSeed === true ) {
    ctx.beginPath();
    ctx.moveTo(tile.x, tile.y);
    ctx.lineTo(tile.x, tile.y - 5);


    const strokeStyle = defineSeedColors(tile.seedsType)

    ctx.strokeStyle = strokeStyle.stroke;

    ctx.stroke();
    ctx.closePath();

  }
}


const drawPlant = (ctx: CanvasRenderingContext2D, tile: Tile)=>{ 
    drawSeed(ctx, tile)
}


export const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile) => {
  const tileColors = defineTileColors(tile);

  ctx.fillStyle = tileColors.fill;

  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);

  drawPlant(ctx, tile)

};
