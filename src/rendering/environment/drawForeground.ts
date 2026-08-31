import type { GameAssets } from "../../assets/assetTypes";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../game/world/world.constant";

export  const drawForeground = (
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
) => {
  const image = assets.foreground;

  if (!image) return;

  ctx.drawImage(
    image,
    0,
    -125,
   WORLD_WIDTH,
   WORLD_HEIGHT
  );
};
