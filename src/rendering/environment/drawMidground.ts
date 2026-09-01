import type { GameAssets } from "../../assets/assetTypes";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../game/world/world.constant";

export const drawMidground = (
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
) => {
  const image = assets.midground;

  if (!image) return;

  ctx.drawImage(
    image,
    0,
    -205,
    WORLD_WIDTH,
    WORLD_HEIGHT,
  );
};
