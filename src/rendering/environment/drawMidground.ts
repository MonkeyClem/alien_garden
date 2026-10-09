import type { GameAssets } from "../../assets/assetTypes";
import { WORLD_HEIGHT, WORLD_WIDTH } from "../../game/world/world.constant";

export const drawMidground = (ctx: CanvasRenderingContext2D, assets: GameAssets) => {
  const image = assets.midground;
  const secondImage = assets.midgroundTwo;
  const thirdImage = assets.midgroundThree;

  const fillerOne = assets.midgroundFillerOne;

  if (!image) return;

  ctx.drawImage(thirdImage, WORLD_WIDTH / 3, -55, WORLD_WIDTH / 3, WORLD_HEIGHT / 3);

  ctx.drawImage(thirdImage, WORLD_WIDTH / 3, -75, WORLD_WIDTH / 3, WORLD_HEIGHT / 3);

  ctx.drawImage(secondImage, 850, -150, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, 450, -160, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, 950, -125, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, 1020, -75, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(image, 1080, -75, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, 150, -125, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(secondImage, 50, -100, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, 50, -90, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(secondImage, -30, -90, WORLD_WIDTH / 3, WORLD_HEIGHT / 2);

  ctx.drawImage(thirdImage, -40, -20, WORLD_WIDTH / 5, WORLD_HEIGHT / 2);

  ctx.drawImage(fillerOne, -0, 300, WORLD_WIDTH / 6, WORLD_HEIGHT / 10);
};
