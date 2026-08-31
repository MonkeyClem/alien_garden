import type { GameAssets } from "../../assets/assetTypes";
import  { HALF_TILE_WIDTH, HALF_TILE_HEIGHT } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";

export const drawGroundOverlay = (
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


