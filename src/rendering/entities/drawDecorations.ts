import type { GameAssets } from "../../assets/assetTypes";
import type { Decoration } from "../../game/decorations/decoration.type";
import { HALF_TILE_HEIGHT } from "../../game/grid/grid.constants";
import type { Tile } from "../../game/grid/tiles.types";

export const drawDecoration = (
  ctx: CanvasRenderingContext2D,
  time: number,
  decoration: Decoration,
  tile: Tile,
  assets: GameAssets,
) => {
  const image = assets[decoration.assetKey];

  const x = tile.x - decoration.width / 2 + decoration.offsetX;

  const y = tile.y - decoration.height / 2 + HALF_TILE_HEIGHT + decoration.offsetY;

  ctx.drawImage(image, x, y, decoration.width, decoration.height);

  if (decoration.assetKey === "bioBatteryOn") {
    const glowOpacity = 0.15 + 0.75 * ((Math.sin(time * 0.003) + 1) / 2);
    ctx.save();

    ctx.globalAlpha = glowOpacity;
    ctx.globalCompositeOperation = "lighter";

    ctx.drawImage(assets.bioBatteryOnGlow, x, y, decoration.width, decoration.height);

    ctx.restore();
  }
};
