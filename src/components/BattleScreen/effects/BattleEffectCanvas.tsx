import { useEffect, useRef } from "react";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../../../game/world/world.constant";
import type { BattlePosition } from "../BattleScreen";
import { drawElectricArc } from "../../../rendering/entities/drawDepthSortedWorld";

type BattleEffectsCanvasProps = {
  position: BattlePosition;
};

export default function BattleEffectsCanvas({ position }: BattleEffectsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawElectricArc(ctx, position, { x: 1100, y: 290 });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  return (
    <canvas
      ref={canvasRef}
      width={WORLD_WIDTH}
      height={WORLD_HEIGHT}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
}
