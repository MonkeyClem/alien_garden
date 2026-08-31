import type { GameAssets } from "../../assets/assetTypes";
import { HALF_TILE_HEIGHT, HALF_TILE_WIDTH } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";

export const drawTexturedTile = (
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