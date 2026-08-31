import type { GameAssets } from "../../assets/assetTypes";

export const drawMidground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  assets: GameAssets,
) => {
  const image = assets.midground;

  if (!image) return;

  ctx.drawImage(
    image,
    0,
    -75,
    canvas.width,
    canvas.height,
  );
};
