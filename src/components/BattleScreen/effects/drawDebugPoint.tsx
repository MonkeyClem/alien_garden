import type { BattlePosition } from "../BattleScreen";

export function drawDebugPoint(ctx: CanvasRenderingContext2D, position: BattlePosition) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}
