import type { GameAssets } from "../../assets/assetTypes";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../game/world/world.constant";

export default function drawBackground(
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
) {
  const image = assets.mapBackground;

  if (!image) return;

  ctx.drawImage(image, 0, 0, WORLD_WIDTH, WORLD_HEIGHT);
}
