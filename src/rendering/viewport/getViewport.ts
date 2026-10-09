import { WORLD_WIDTH, WORLD_HEIGHT } from "../../game/world/world.constant";
import type { Viewport } from "./viewport.type";

export const getViewport = (canvasWidth: number, canvasHeight: number): Viewport => {
  const scale = Math.min(canvasWidth / WORLD_WIDTH, canvasHeight / WORLD_HEIGHT);

  return {
    scale,
    offsetX: (canvasWidth - WORLD_WIDTH * scale) / 2,
    offsetY: (canvasHeight - WORLD_HEIGHT * scale) / 2,
  };
};
