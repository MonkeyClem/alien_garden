import type { GameAssets } from "../../assets/assetTypes";

  export default function drawBackground(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    assets: GameAssets
  ){

    const image = assets.mapBackground;

  if (!image) return;

  ctx.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  };