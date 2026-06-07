import { type Tile } from "../../type";
import type { seedsType } from "../../type";
import bioBattery from "../../../assets/PNG/Assets/bioPalmtree.png";

export const drawTileEdges = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  tiles: Tile[]
) => {
  const TILE_W = 12
  const TILE_H = 45
  const EDGE_H = 40

  const hasNeighbor = (dx: number, dy: number) => {
    return tiles.some(t => t.x === tile.x + dx && t.y === tile.y + dy)
  }

  const x = tile.x
  const y = tile.y

  const right = { x: x + TILE_W / 2, y }
  const bottom = { x, y: y + TILE_H / 2}
  const left = { x: x - TILE_W / 2, y }

  const bottomRight = { x: right.x, y: right.y + EDGE_H }
  const bottomBottom = { x: bottom.x, y: bottom.y + EDGE_H }
  const bottomLeft = { x: left.x, y: left.y + EDGE_H }

  // Face droite visible
  if (!hasNeighbor(1, 0)) {
    ctx.beginPath()
    ctx.moveTo(right.x , right.y)
    ctx.lineTo(bottom.x , bottom.y)
    ctx.lineTo(bottomBottom.x, bottomBottom.y)
    ctx.lineTo(bottomRight.x, bottomRight.y)
    ctx.closePath()

    ctx.fillStyle = "#3a1f5c"
    ctx.fill()
  }

  // Face gauche visible
  if (!hasNeighbor(0, 1)) {
    ctx.beginPath()
    ctx.moveTo(bottom.x , bottom.y )
    ctx.lineTo(left.x, left.y)
    ctx.lineTo(bottomLeft.x , bottomLeft.y  )
    ctx.lineTo(bottomBottom.x, bottomBottom.y)
    ctx.closePath()

    ctx.fillStyle = "#241044"
    ctx.fill()
  }
}


const bioBatterySprite = new Image();
bioBatterySprite.src = bioBattery;

bioBatterySprite.loading = "eager";
console.log("console.log(mushroomSprite.complete); ", bioBatterySprite.complete);

const defineSeedColors = (seedsType: seedsType) : {stroke : string } => {
  if (seedsType === "blue")
    return {
      stroke: "#8cdaf2",
    };

  if (seedsType === "green")
    return {
      stroke: "#0bdb7a",
    };

  if (seedsType === "red")
    return {
      stroke: "#b31010",
    };
  else{
    return {
      stroke : "#fff"
    }
  }
};

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

export const drawSeed = (ctx: CanvasRenderingContext2D, tile: Tile) => {
  if (!tile.hasSeed ) return;

  const spriteSize = 192;


  if (tile.hasSeed === true) {
    if (bioBatterySprite.complete && tile.seedsType === "green") {
      ctx.drawImage(
        bioBatterySprite,
        tile.x - spriteSize / 2,
        tile.y - spriteSize / 1.6,
        spriteSize,
        spriteSize,
      );
    } else {
      ctx.beginPath();
      ctx.moveTo(tile.x, tile.y);
      ctx.lineTo(tile.x, tile.y - 5);


      if(!tile.seedsType) return
      const strokeStyle = defineSeedColors(tile.seedsType);

      ctx.strokeStyle = strokeStyle.stroke;

      ctx.stroke();
      ctx.closePath();
    }
  }
};

const drawPlant = (ctx: CanvasRenderingContext2D, tile: Tile) => {
  drawSeed(ctx, tile);
};

export const drawTile = (ctx: CanvasRenderingContext2D, tile: Tile) => {

  const tileColors = defineTileColors(tile);


  ctx.fillStyle = tileColors.fill;
  ctx.fill(tile.path);

  ctx.strokeStyle = tileColors.stroke;
  ctx.stroke(tile.path);

  drawPlant(ctx, tile);

  
};
