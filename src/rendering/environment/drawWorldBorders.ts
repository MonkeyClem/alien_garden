import { WORLD_WIDTH, WORLD_HEIGHT } from "../../game/world/world.constant";
import type { Viewport } from "../viewport/viewport.type";

export const drawWorldBorders = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  viewport: Viewport,
) => {
  const worldWidth = WORLD_WIDTH * viewport.scale;
  const worldHeight = WORLD_HEIGHT * viewport.scale;

  const worldLeft = viewport.offsetX;
  const worldTop = viewport.offsetY;

  const worldRight = worldLeft + worldWidth;
  const worldBottom = worldTop + worldHeight;

  ctx.fillStyle = "#05060A";

  // Left
  ctx.fillRect(0, 0, worldLeft, canvasHeight);

  // Right
  ctx.fillRect(worldRight, 0, canvasWidth - worldRight, canvasHeight);

  // Top
  ctx.fillRect(worldLeft, 0, worldWidth, worldTop);

  // Bottom
  ctx.fillRect(worldLeft, worldBottom, worldWidth, canvasHeight - worldBottom);
};
