import type { GameAssets } from "../assets/assetTypes";
import { initialDecorations } from "../game/decorations/initialDecorations";
import { HALF_TILE_HEIGHT } from "../game/grid/grid.constants";
import type { Tile } from "../game/grid/tiles.types";

export const drawDecorations = (
  ctx: CanvasRenderingContext2D,
  tilePositions: Tile[],
  assets: GameAssets,
) => {
  initialDecorations.forEach((decoration) => {
    const tile = tilePositions.find((tile) => tile.id === decoration.tileId);

    if (!tile) return;

    const image = assets[decoration.assetKey];

    const x = tile.x - decoration.width / 2 + decoration.offsetX;

    const y =
      tile.y - decoration.height / 2 + HALF_TILE_HEIGHT + decoration.offsetY;

    ctx.drawImage(image, x, y, decoration.width, decoration.height);
  });
};
