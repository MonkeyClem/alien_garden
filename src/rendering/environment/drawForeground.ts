import type { GameAssets } from "../../assets/assetTypes";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../game/world/world.constant";

export  const drawForeground = (
  ctx: CanvasRenderingContext2D,
  assets: GameAssets,
) => {
  const image = assets.foreground;

  const secondImage = assets.midgroundThree


  if (!image) return;

  ctx.drawImage(
    image,
    0,
    -10,
   WORLD_WIDTH,
   WORLD_HEIGHT
  );

    ctx.drawImage(
    secondImage,
    1350,
    -25,
   WORLD_WIDTH / 2,
   WORLD_HEIGHT / 1.5
  );
};
