import type { GameAssets } from "../assets/assetTypes";
import  { HALF_TILE_HEIGHT, HALF_TILE_WIDTH } from "../game/grid/grid.constants";
import type {  Tile } from "../game/grid/tiles.types";



const drawGroundOverlay = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets : GameAssets
): void => {
  if (!tile.groundOverlay) return;

  const groundOverlayAssets = {
  smallRock: assets.smallRock,
  spores: assets.spores,
  vein: assets.veins,
} as const

  const overlay =
    groundOverlayAssets[tile.groundOverlay];

  ctx.save();

  ctx.imageSmoothingEnabled = false;

  ctx.clip(tile.path);

  ctx.drawImage(
    overlay,
    tile.x - HALF_TILE_WIDTH,
    tile.y - HALF_TILE_HEIGHT,
    HALF_TILE_WIDTH * 2,
    HALF_TILE_HEIGHT * 2,
  );

  ctx.restore();
};

const drawTexturedTile = (
  ctx: CanvasRenderingContext2D,
  tile: Tile,
  assets : GameAssets
) => {

  const groundTextures = [
  assets.alienGround,
  assets.alienGroundTwo,
  assets.alienGroundThree,
] as const;

  const texture = groundTextures[tile.groundVariant]

  
  ctx.save();

  ctx.beginPath();

  ctx.imageSmoothingEnabled = true;

  ctx.fill(tile.path);

  ctx.moveTo(tile.x, tile.y - HALF_TILE_HEIGHT);
  ctx.lineTo(tile.x + HALF_TILE_WIDTH, tile.y);
  ctx.lineTo(tile.x, tile.y + HALF_TILE_HEIGHT);
  ctx.lineTo(tile.x - HALF_TILE_WIDTH, tile.y);

  ctx.closePath();

  ctx.clip();

  ctx.drawImage(
    texture,
    tile.x - HALF_TILE_WIDTH,
    tile.y - HALF_TILE_HEIGHT,
    HALF_TILE_WIDTH * 2,
    HALF_TILE_HEIGHT * 2,
  );


  ctx.restore();
};





export default function drawAllTiles(
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets : GameAssets
) {
  return tilePositions.forEach((tile) => {
    drawTexturedTile(ctx, tile, assets)
    drawGroundOverlay(ctx, tile, assets)
  }
      //  return tilePositions.forEach((tile) => drawTile(ctx, tile, assets)

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