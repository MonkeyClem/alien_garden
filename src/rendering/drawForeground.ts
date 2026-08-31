import type { GameAssets } from "../assets/assetTypes";

export  const drawForeground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  assets: GameAssets,
) => {
  const image = assets.foreground;

  if (!image) return;

  ctx.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height,
  );
};
