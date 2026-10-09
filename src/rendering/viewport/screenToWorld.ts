import { getViewport } from "./getViewport";

export const screenToWorld = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
): { worldX: number; worldY: number } => {
  const viewPort = getViewport(canvas.width, canvas.height);
  const rect = canvas.getBoundingClientRect();

  const canvasX = event.clientX - rect.left;
  const canvasY = event.clientY - rect.top;

  const worldX = (canvasX - viewPort.offsetX) / viewPort.scale;
  const worldY = (canvasY - viewPort.offsetY) / viewPort.scale;

  return {
    worldX,
    worldY,
  };
};
